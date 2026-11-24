#!/usr/bin/env python3
"""Compiles site/CHANGELOG.md into an editorial timeline at site/release-notes/index.html."""
import datetime
import html
import pathlib
import re

SITE_DIR = pathlib.Path(__file__).resolve().parent.parent
CHANGELOG = SITE_DIR / "CHANGELOG.md"
OUT_HTML = SITE_DIR / "release-notes" / "index.html"

BOLD = re.compile(r"\*\*([^*]+)\*\*")
CODE = re.compile(r"`([^`]+)`")
LINK = re.compile(r"\[([^\]]+)\]\((https?://[^)\s]+)\)")


def format_day(iso: str) -> str:
    d = datetime.date.fromisoformat(iso)
    return f"{d.strftime('%b')} {d.day}, {d.year}"


def render_inline(text: str) -> str:
    escaped = html.escape(text)
    escaped = LINK.sub(lambda m: f'<a href="{m.group(2)}" target="_blank" rel="noopener">{m.group(1)}</a>', escaped)
    escaped = BOLD.sub(r"<strong>\1</strong>", escaped)
    escaped = CODE.sub(r"<code>\1</code>", escaped)
    return escaped


def parse_changelog(md_text: str):
    versions = []
    current = None
    for raw in md_text.splitlines():
        line = raw.strip()
        if line.startswith("## "):
            m = re.match(r"## \[([^\]]+)\] - (\d{4}-\d{2}-\d{2})", line)
            current = {"version": m.group(1), "date": m.group(2), "summary": [], "sections": []} if m else None
            if current:
                versions.append(current)
        elif current and line.startswith("### "):
            current["sections"].append((line[4:], []))
        elif current and line.startswith("- ") and current["sections"]:
            current["sections"][-1][1].append(line[2:])
        elif current and line and not current["sections"] and not line.startswith("#"):
            current["summary"].append(line)
    return versions


def build_html(versions) -> str:
    jump_pills = " ".join(
        f'<a href="#v{html.escape(v["version"])}">v{html.escape(v["version"])}</a>' for v in versions
    )

    items = []
    for v in versions:
        ver = html.escape(v["version"])
        iso = html.escape(v["date"])
        summary_html = "".join(f'<p class="summary">{render_inline(s)}</p>' for s in v["summary"])
        sections_html = "".join(
            f"<h3>{html.escape(title)}</h3><ul>"
            + "".join(f"<li>{render_inline(item)}</li>" for item in rows)
            + "</ul>"
            for title, rows in v["sections"]
        )
        items.append(
            f'<article class="rel-item" id="v{ver}">'
            f'<div class="rel-item-head">'
            f'<h2><a href="#v{ver}">v{ver}</a></h2>'
            f'<time datetime="{iso}">{format_day(v["date"])}</time>'
            f'</div>'
            f'{summary_html}{sections_html}'
            f'</article>'
        )

    timeline_html = "\n    ".join(items)
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Noteelus Release Notes</title>
<meta name="description" content="Recent updates and improvements in Noteelus across desktop and mobile.">
<link rel="canonical" href="https://noteelus.github.io/release-notes/">
<link rel="icon" type="image/png" href="/assets/favicon-64.png?v=3">
<link rel="apple-touch-icon" href="/assets/icon-256.png?v=3">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Noteelus">
<meta property="og:title" content="Noteelus Release Notes">
<meta property="og:description" content="Recent updates and improvements in Noteelus across desktop and mobile.">
<meta property="og:image" content="https://noteelus.github.io/assets/og.png">
<script>
(function(){{try{{var s=localStorage.getItem("noteelus_theme");var d=s==="dark"||(s!=="light"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.setAttribute("data-theme","dark");}}catch(_){{if(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches)document.documentElement.setAttribute("data-theme","dark");}}}})();
</script>
<link rel="stylesheet" href="/assets/site.css?v=6">
</head>
<body>

<header class="topbar">
  <div class="topbar-inner">
    <a class="brand" href="/">
      <img src="/assets/icon-64.png?v=3" width="28" height="28" alt="">
      <span>Noteelus</span>
    </a>
    <div class="tools">
      <button type="button" class="icon-btn" data-theme-toggle aria-pressed="false" aria-label="Dark" title="Toggle Light / Dark">
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8" cy="8" r="3.2"/><path d="M8 1.5v1.3M8 13.2v1.3M1.5 8h1.3M13.2 8h1.3M3.4 3.4l.9.9M11.7 11.7l.9.9M12.6 3.4l-.9.9M4.3 11.7l-.9.9"/></svg>
        <span data-theme-label>Dark</span>
      </button>
      <div class="lang-menu" data-lang-menu>
        <button type="button" class="lang-trigger" data-lang-trigger aria-haspopup="listbox" aria-expanded="false" aria-label="Language" title="Language">
          <svg class="lang-globe" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="8" cy="8" r="6.2"/><ellipse cx="8" cy="8" rx="3.1" ry="6.2"/><path d="M2 8h12M2.8 5h10.4M2.8 11h10.4"/></svg>
          <span class="lang-name-full" data-lang-full>English</span>
          <span class="lang-name-short" data-lang-short>EN</span>
          <svg class="lang-caret" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4.5L6 7.5L9 4.5"/></svg>
        </button>
        <div class="lang-popover" data-lang-popover role="listbox" aria-label="Language" hidden>
          <button type="button" class="lang-option" role="option" data-lang-opt="en" aria-selected="true"><span>English</span><span class="lang-check" aria-hidden="true">✓</span></button>
          <button type="button" class="lang-option" role="option" data-lang-opt="zh-CN" aria-selected="false"><span>简体中文</span><span class="lang-check" aria-hidden="true">✓</span></button>
          <button type="button" class="lang-option" role="option" data-lang-opt="ru" aria-selected="false"><span>Русский</span><span class="lang-check" aria-hidden="true">✓</span></button>
          <button type="button" class="lang-option" role="option" data-lang-opt="es" aria-selected="false"><span>Español</span><span class="lang-check" aria-hidden="true">✓</span></button>
          <button type="button" class="lang-option" role="option" data-lang-opt="pt-BR" aria-selected="false"><span>Português (Brasil)</span><span class="lang-check" aria-hidden="true">✓</span></button>
          <button type="button" class="lang-option" role="option" data-lang-opt="fr" aria-selected="false"><span>Français</span><span class="lang-check" aria-hidden="true">✓</span></button>
          <button type="button" class="lang-option" role="option" data-lang-opt="tr" aria-selected="false"><span>Türkçe</span><span class="lang-check" aria-hidden="true">✓</span></button>
        </div>
      </div>
      <a class="btn small" href="/download/" data-i18n="nav.download">Download</a>
    </div>
  </div>
</header>

<main class="wrap">
  <section class="page-head">
    <h1 data-i18n="rn.h1">Release Notes</h1>
    <p data-i18n="rn.sub">Recent improvements across desktop and mobile.</p>
    <nav class="jump-pills" aria-label="Versions">{jump_pills}</nav>
  </section>

  <section class="releases-list">
    {timeline_html}
  </section>
</main>

<footer class="site-footer">
  <nav class="foot-links">
    <a href="/download/" data-i18n="nav.download">Download</a>
    <a href="/release-notes/" data-i18n="nav.updates">Updates</a>
    <a href="/privacy.html" data-i18n="foot.priv">Privacy Policy</a>
    <a href="/terms.html" data-i18n="foot.terms">Terms of Use</a>
    <a href="/THIRD_PARTY_NOTICES.md" data-i18n="foot.notices">Third-Party Notices</a>
    <a href="https://github.com/Noteelus/noteelus.github.io">GitHub</a>
    <a href="mailto:noteelus-support@googlegroups.com">noteelus-support@googlegroups.com</a>
  </nav>
  <div>© 2026 Noteelus</div>
</footer>

<script src="/assets/i18n.js?v=6"></script>
<script src="/assets/site.js?v=6"></script>
</body>
</html>
"""


def main():
    versions = parse_changelog(CHANGELOG.read_text(encoding="utf-8"))
    OUT_HTML.parent.mkdir(parents=True, exist_ok=True)
    OUT_HTML.write_text(build_html(versions), encoding="utf-8")
    print(f"Wrote {OUT_HTML} ({len(versions)} releases)")


if __name__ == "__main__":
    main()
