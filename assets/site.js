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

    // Platform + Architecture Auto-Detection & GitHub Releases Loader (/ and /download/)
    var detected = detectPlatformAndArch();
    var releaseState = { tag: null, assets: null };
    var othersEl = document.getElementById("dl-others");
    var hasAllHash = window.location.hash === "#all";

    function currentDict() {
      var lang = document.documentElement.lang || "en";
      var i18n = window.NoteelusI18n && window.NoteelusI18n.dict;
      return (i18n && (i18n[lang] || i18n.en)) || null;
    }

    function detectPlatformAndArch() {
      var uad = navigator.userAgentData;
      var uadPlat = (uad && uad.platform ? uad.platform : "").toLowerCase();
      var ua = (navigator.userAgent || "").toLowerCase();
      var plat = (navigator.platform || "").toLowerCase();
      var os = "other";

      if (/iphone|ipad|ipod/.test(ua) || (/mac/.test(plat) && navigator.maxTouchPoints > 1)) {
        os = "ios";
      } else if (uadPlat === "android" || /android/.test(ua)) {
        os = "android";
      } else if (uadPlat === "windows" || /win/.test(ua) || /win/.test(plat)) {
        os = "win";
      } else if (uadPlat === "macos" || /mac/.test(ua) || /mac/.test(plat)) {
        os = "mac";
      }

      var arch = os === "mac" ? "arm64" : os === "win" ? "x64" : os === "android" ? "universal" : "";
      if (os === "mac") {
        try {
          var c = document.createElement("canvas");
          var gl = c.getContext("webgl") || c.getContext("experimental-webgl");
          if (gl) {
            var ext = gl.getExtension("WEBGL_debug_renderer_info");
            var rnd = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || "").toLowerCase() : "";
            if ((/\bintel\b/.test(rnd) || /\bamd\b/.test(rnd)) && rnd.indexOf("apple") === -1) {
              arch = "x64";
            }
          }
        } catch (_) {}
      }
      return { os: os, arch: arch };
    }

    function formatBytes(bytes) {
      if (!bytes || isNaN(bytes)) return "";
      var mb = Math.round(bytes / (1024 * 1024));
      return mb > 0 ? mb + " MB" : Math.max(1, Math.round(bytes / 1024)) + " KB";
    }

    function renderDownloadUi(fromInit) {
      var d = currentDict();
      var os = detected.os;
      var supported = (os === "mac" && detected.arch !== "x64") || os === "win" || os === "android";
      var keyMap = { mac: "mac", win: "win", android: "and" };
      var k = keyMap[os];
      var titles = { mac: "macOS", win: "Windows", android: "Android", ios: "iPhone & iPad", other: "Noteelus" };
      var exts = { mac: ".pkg", win: ".exe", android: ".apk" };
      var assets = releaseState.assets;
      var activeAsset = supported && assets ? assets[os] : null;

      // /download/ page single-focus card + subtle platform/arch picker
      var primaryCard = document.getElementById("dl-primary-card");
      if (!primaryCard) return;

      var verBadge = document.getElementById("release-version");
      if (verBadge && releaseState.tag) {
        verBadge.textContent = releaseState.tag;
        verBadge.hidden = false;
      }

      var pillEl = document.getElementById("dl-detected-pill");
      var titleEl = document.getElementById("detected-os-title");
      var archEl = document.getElementById("detected-os-arch");
      var descEl = document.getElementById("detected-os-desc");
      var ctaEl = document.getElementById("os-primary-cta");
      var fileMetaEl = document.getElementById("detected-file-meta");
      var guideWrap = document.getElementById("detected-guide-wrap");
      var guideEl = document.getElementById("detected-os-guide");

      if (titleEl) titleEl.textContent = os === "mac" && detected.arch === "x64" ? "macOS · Intel" : (titles[os] || "Noteelus");

      if (supported) {
        if (pillEl) {
          pillEl.hidden = false;
          if (d && d["dl.detected"]) pillEl.textContent = d["dl.detected"];
        }
        if (archEl) {
          archEl.hidden = false;
          if (d && d["dl." + k + ".arch"]) archEl.textContent = d["dl." + k + ".arch"];
        }
        if (descEl && d && d["dl." + k + ".desc"]) descEl.textContent = d["dl." + k + ".desc"];
        if (ctaEl) {
          ctaEl.hidden = false;
          if (d && d["dl." + k + ".btn"]) ctaEl.textContent = d["dl." + k + ".btn"];
          ctaEl.href = activeAsset && activeAsset.url ? activeAsset.url : FALLBACK_RELEASES;
        }
        if (fileMetaEl) {
          if (activeAsset && activeAsset.name) {
            var sz = formatBytes(activeAsset.size);
            fileMetaEl.textContent = sz ? activeAsset.name + " · " + sz : activeAsset.name;
            fileMetaEl.hidden = false;
          } else {
            fileMetaEl.hidden = true;
          }
        }
        if (guideEl && d && d["dl." + k + ".guide"]) guideEl.innerHTML = d["dl." + k + ".guide"];
        if (guideWrap) guideWrap.hidden = false;
      } else {
        if (pillEl) pillEl.hidden = !(os === "ios" || (os === "mac" && detected.arch === "x64"));
        if (archEl) {
          archEl.hidden = os !== "ios" && os !== "mac";
          if (os === "ios") archEl.textContent = "iOS";
          else if (os === "mac") archEl.textContent = "Intel (x86_64)";
        }
        if (descEl && d) {
          if (os === "mac" && detected.arch === "x64") descEl.textContent = d["dl.intel.note"];
          else if (os === "ios") descEl.textContent = d["dl.ios.soon"];
          else descEl.textContent = d["dl.other.os"];
        }
        if (ctaEl) ctaEl.hidden = true;
        if (fileMetaEl) fileMetaEl.hidden = true;
        if (guideWrap) guideWrap.hidden = true;
      }

      document.querySelectorAll("[data-os-row]").forEach(function (row) {
        var rowOs = row.getAttribute("data-os-row");
        row.classList.toggle("is-current", supported && rowOs === os);
      });

      ["mac", "win", "android"].forEach(function (p) {
        var asset = assets ? assets[p] : null;
        var a = document.getElementById("dl-" + p);
        if (a) a.href = asset && asset.url ? asset.url : FALLBACK_RELEASES;
        var s = document.getElementById("size-" + p);
        if (s) {
          var txt = asset ? formatBytes(asset.size) : "";
          s.textContent = txt;
          s.hidden = !txt;
        }
      });

      if (othersEl && fromInit) {
        othersEl.open = !supported || hasAllHash;
      }
    }

    if (document.getElementById("dl-primary-card")) {
      renderDownloadUi(true);
      document.addEventListener("noteelus:langchange", function () { renderDownloadUi(false); });

      if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
        navigator.userAgentData.getHighEntropyValues(["architecture", "bitness"]).then(function (hints) {
          var a = (hints && hints.architecture ? hints.architecture : "").toLowerCase();
          if (detected.os === "mac" && a === "x86") {
            detected.arch = "x64";
            renderDownloadUi(true);
          } else if (detected.os === "win" && a === "arm") {
            detected.arch = "arm64";
            renderDownloadUi(false);
          }
        }).catch(function () {});
      }

      fetch("https://api.github.com/repos/" + REPO + "/releases/latest", { headers: { Accept: "application/vnd.github+json" } })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (rel) {
          if (!rel || !Array.isArray(rel.assets) || !rel.assets.length) return;
          var macAsset = rel.assets.find(function (a) { return /mac.*(apple-silicon|arm64).*\.pkg$/i.test(a.name); }) ||
            rel.assets.find(function (a) { return /mac.*\.pkg$/i.test(a.name); });
          var winAsset = rel.assets.find(function (a) { return /windows.*\.exe$/i.test(a.name); });
          var andAsset = rel.assets.find(function (a) { return /android.*\.apk$/i.test(a.name); });
          releaseState.tag = rel.tag_name || null;
          releaseState.assets = {
            mac: macAsset ? { url: macAsset.browser_download_url, name: macAsset.name, size: macAsset.size } : null,
            win: winAsset ? { url: winAsset.browser_download_url, name: winAsset.name, size: winAsset.size } : null,
            android: andAsset ? { url: andAsset.browser_download_url, name: andAsset.name, size: andAsset.size } : null
          };
          renderDownloadUi(false);
        })
        .catch(function () {});
    }
  });
})();
