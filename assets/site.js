/* Noteelus site behaviors: Light/Dark theme + adaptive media, map view switcher, lazy clips, OS release loader. */
(function () {
  var REPO = "Noteelus/noteelus.github.io";
  var FALLBACK_RELEASES = "https://github.com/" + REPO + "/releases/latest";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function detectSystemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function syncThemeVideos(theme) {
    var isDark = theme === "dark";
    document.querySelectorAll("video[data-src-light][data-src-dark]").forEach(function (v) {
      var targetSrc = isDark ? v.getAttribute("data-src-dark") : v.getAttribute("data-src-light");
      var targetPoster = isDark ? v.getAttribute("data-poster-dark") : v.getAttribute("data-poster-light");
      if (targetPoster && v.getAttribute("poster") !== targetPoster) {
        v.setAttribute("poster", targetPoster);
        v.style.backgroundImage = "url(" + targetPoster + ")";
      }
      if (targetSrc && v.getAttribute("src") !== targetSrc) {
        var wasPlaying = !v.paused;
        v.setAttribute("src", targetSrc);
        v.load();
        if (!reduceMotion && !v.closest("[hidden]")) {
          var rect = v.getBoundingClientRect();
          var nearViewport = rect.height > 0 && rect.top < window.innerHeight * 1.35 && rect.bottom > -window.innerHeight * 0.35;
          if (wasPlaying || nearViewport) {
            var p = v.play();
            if (p && p.catch) p.catch(function () {});
          }
        }
      }
    });
  }

  function applyTheme(theme, persist) {
    var root = document.documentElement;
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    if (persist) {
      try { localStorage.setItem("noteelus_theme", theme); } catch (_) {}
    }
    var lang = root.lang || "en";
    var d = window.NoteelusI18n && window.NoteelusI18n.dict && (window.NoteelusI18n.dict[lang] || window.NoteelusI18n.dict.en);
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      var nextTxt = d ? (theme === "dark" ? d["theme.light"] : d["theme.dark"]) : (theme === "dark" ? "Light" : "Dark");
      btn.setAttribute("aria-label", nextTxt);
      var lbl = btn.querySelector("[data-theme-label]");
      if (lbl) lbl.textContent = nextTxt;
    });
    syncThemeVideos(theme);
  }

  var initialTheme = detectSystemTheme();
  try {
    var savedTheme = localStorage.getItem("noteelus_theme");
    if (savedTheme === "dark" || savedTheme === "light") initialTheme = savedTheme;
  } catch (_) {}
  applyTheme(initialTheme, false);

  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onOsTheme = function (e) {
      var saved = null;
      try { saved = localStorage.getItem("noteelus_theme"); } catch (_) {}
      if (saved !== "dark" && saved !== "light") {
        applyTheme(e.matches ? "dark" : "light", false);
      }
    };
    if (mq.addEventListener) mq.addEventListener("change", onOsTheme);
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light", false);

    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next, true);
      });
    });

    // Travel Maps View Switcher (Preview / 3D / 2D)
    var mapBtns = document.querySelectorAll("[data-map-mode]");
    var mapViews = document.querySelectorAll("[data-map-view]");
    mapBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var mode = btn.getAttribute("data-map-mode");
        mapBtns.forEach(function (b) { b.setAttribute("aria-selected", b === btn ? "true" : "false"); });
        mapViews.forEach(function (v) {
          var active = v.getAttribute("data-map-view") === mode;
          v.hidden = !active;
          var vid = v.querySelector("video");
          if (vid) {
            if (active && !reduceMotion) {
              var p = vid.play();
              if (p && p.catch) p.catch(function () {});
            } else {
              vid.pause();
            }
          }
        });
      });
    });

    // Lazy Video Playback via IntersectionObserver
    var videos = document.querySelectorAll("video");
    videos.forEach(function (v) {
      if (v.poster) v.style.backgroundImage = "url(" + v.poster + ")";
    });
    if (!reduceMotion && "IntersectionObserver" in window && videos.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var v = e.target;
          var insideHidden = v.closest("[hidden]");
          if (e.isIntersecting && !insideHidden) {
            var p = v.play();
            if (p && p.catch) p.catch(function () {});
          } else {
            v.pause();
          }
        });
      }, { rootMargin: "35% 0px" });
      videos.forEach(function (v) { io.observe(v); });
    }

    // Download Page OS Detection & GitHub Releases Loader
    var osCards = document.querySelectorAll("[data-os-card]");
    if (osCards.length) {
      var ua = (navigator.userAgent || "").toLowerCase();
      var plat = (navigator.platform || "").toLowerCase();
      var os = /android/.test(ua) ? "android" : (/win/.test(ua) || /win/.test(plat)) ? "win" : "mac";

      osCards.forEach(function (card) {
        card.classList.toggle("is-detected", card.getAttribute("data-os-card") === os);
      });

      var osNames = { mac: "macOS (.pkg)", win: "Windows (.exe)", android: "Android (.apk)" };
      var osLabelEl = document.getElementById("detected-os-name");
      if (osLabelEl) osLabelEl.textContent = osNames[os];

      var primaryCta = document.getElementById("os-primary-cta");
      fetch("https://api.github.com/repos/" + REPO + "/releases/latest", { headers: { Accept: "application/vnd.github+json" } })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (rel) {
          if (!rel || !Array.isArray(rel.assets) || !rel.assets.length) return;
          var verBadge = document.getElementById("release-version");
          if (verBadge && rel.tag_name) {
            verBadge.textContent = rel.tag_name;
            verBadge.hidden = false;
          }
          var macAsset = rel.assets.find(function (a) { return /mac.*\.pkg$/i.test(a.name); });
          var winAsset = rel.assets.find(function (a) { return /windows.*\.exe$/i.test(a.name); });
          var andAsset = rel.assets.find(function (a) { return /android.*\.apk$/i.test(a.name); });

          var urls = {
            mac: macAsset ? macAsset.browser_download_url : FALLBACK_RELEASES,
            win: winAsset ? winAsset.browser_download_url : FALLBACK_RELEASES,
            android: andAsset ? andAsset.browser_download_url : FALLBACK_RELEASES
          };
          if (primaryCta) primaryCta.href = urls[os];
          ["mac", "win", "android"].forEach(function (k) {
            var a = document.getElementById("dl-" + k);
            if (a) a.href = urls[k];
          });
        })
        .catch(function () {});
    }
  });
})();
