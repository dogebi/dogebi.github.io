/* destroy-any-website — 정적 배포용 부트 스크립트
 *  - 언어 전환 UI (en/zh/ja/ko) + 브라우저 언어 자동 리다이렉트
 *  - /api/page 프록시가 없는 정적 호스팅(GitHub Pages)에서 공개 CORS 프록시로 폴백
 *  - 정적 호스팅에서는 멀티플레이 블록을 숨김 (서버 필요)
 * 빌드 시 /pohuai/ / ko / [["en", "English"], ["zh", "中文"], ["ja", "日本語"], ["ko", "한국어"]] / {"multiplayer": "멀티플레이", "loadFailed": "그 사이트를 불러올 수 없습니다."} / __MSG__ 가 치환된다.
 */
(function () {
  var BASE = "/pohuai/";            // 예: "/pohuai/"
  var LANG = "ko";            // en | zh | ja | ko
  var LABELS = [["en", "English"], ["zh", "中文"], ["ja", "日本語"], ["ko", "한국어"]];          // [["en","English"],["zh","中文"],...]
  var DIRS = {"en": "", "zh": "zh", "ja": "ja", "ko": "ko"};              // {en:"",zh:"zh",...}
  var UI = {"multiplayer": "멀티플레이", "loadFailed": "그 사이트를 불러올 수 없습니다."};                  // {multiplayer:"Multiplayer", loadFailed:"...", ...}
  var STATIC = !/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);

  if (STATIC) window.__DAW_NO_RUNNER = true; // 원본 /p/ 러너는 서버 기능 → 정적에선 건너뜀

  var DAW_STYLE = '<style id="daw-inject">*,*::before,*::after{animation:none!important;' +
    'transition:none!important;caret-color:transparent!important;' +
    'content-visibility:visible!important}html{scroll-behavior:auto!important}</style>';

  var PROXIES = [
    "https://api.allorigins.win/raw?url=",
    "https://api.codetabs.com/v1/proxy?quest=",
    "https://corsproxy.io/?url=",
    "https://api.cors.lol/?url=",
    "https://whateverorigin.org/get?url="
  ];

  // 직접 만든 프록시를 쓸 수 있게: ?proxy=<url> 또는 localStorage("daw:proxy")
  // 예) ?proxy=http://localhost:8380/api/page%3Furl%3D  (로컬 server.py 를 프록시로 사용)
  function customProxy() {
    try {
      var q = new URLSearchParams(location.search).get("proxy");
      if (q) {
        localStorage.setItem("daw:proxy", q);
        return q;
      }
      return localStorage.getItem("daw:proxy") || "";
    } catch (e) { return ""; }
  }

  function normalize(raw) {
    var url = String(raw || "").trim();
    if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(url)) url = "https://" + url.replace(/^\/+/, "");
    return url;
  }

  function prepare(html, finalUrl) {
    if (!/<base\b/i.test(html)) {
      html = html.replace(/<head\b[^>]*>/i, function (m) { return m + '<base href="' + finalUrl + '">'; });
    }
    if (html.indexOf("daw-inject") < 0) {
      html = html.replace(/<head\b[^>]*>/i, function (m) { return m + DAW_STYLE; });
    }
    return html;
  }

  function errorOf(text) {
    try {
      var j = JSON.parse(text);
      if (j && j.error) return new Error(j.error);
    } catch (e) { /* html */ }
    return null;
  }

  window.__dawLoadPage = async function (raw) {
    var input = String(raw || "").trim();
    if (input === "demo") {
      // 내장 데모 페이지는 로컬 파일로 제공 (네트워크 불필요)
      var r = await fetch(BASE + "assets/demo.html", { cache: "no-store" });
      if (!r.ok) throw new Error(UI.loadFailed);
      return { html: prepare(await r.text(), location.origin + BASE), finalUrl: "demo" };
    }
    var url = normalize(input);
    var attempts = [];
    var mine = customProxy();
    if (mine) attempts.push({ url: mine + encodeURIComponent(url), direct: false });
    if (!STATIC) attempts.push({ url: "/api/page?url=" + encodeURIComponent(url), direct: true });
    for (var i = 0; i < PROXIES.length; i++) {
      attempts.push({ url: PROXIES[i] + encodeURIComponent(url), direct: false });
    }
    var lastErr = new Error(UI.loadFailed);
    for (var k = 0; k < attempts.length; k++) {
      try {
        var res = await fetch(attempts[k].url, { cache: "no-store" });
        if (!res.ok) {
          var msg = errorOf(await res.text());
          if (msg) throw msg;
          continue;
        }
        var body = await res.text();
        var parsed = errorOf(body);
        if (parsed) { lastErr = parsed; continue; }
        if (body.length < 2) continue;
        var finalUrl = res.headers.get("x-final-url") || url;
        return { html: prepare(body, finalUrl), finalUrl: finalUrl };
      } catch (e) {
        lastErr = e && e.message ? e : lastErr;
      }
    }
    throw lastErr instanceof Error ? lastErr : new Error(UI.loadFailed);
  };

  // ── 언어 전환 UI ───────────────────────────────────────────────
  var CSS = ".lang-switch{display:flex;gap:6px;align-items:center;margin-right:6px}" +
    ".lang-switch a{display:block;padding:5px 8px;font:12px/1 inherit;color:#c9c9d1;" +
    "background:#1a1422;border:2px solid #0b0812;text-decoration:none;letter-spacing:.5px}" +
    ".lang-switch a.on{color:#fff;background:#3b2f4d}" +
    ".lang-switch a:hover{color:#fff}";

  function mountSwitcher() {
    var bar = document.querySelector(".head-right");
    if (!bar) return false;
    var wrap = document.createElement("div");
    wrap.className = "lang-switch";
    LABELS.forEach(function (pair) {
      var code = pair[0], label = pair[1];
      var a = document.createElement("a");
      a.href = BASE + DIRS[code] + "/";
      a.textContent = label;
      if (code === LANG) a.className = "on";
      a.addEventListener("click", function () {
        try { localStorage.setItem("daw:lang", code); } catch (e) { }
      });
      wrap.appendChild(a);
    });
    bar.insertBefore(wrap, bar.firstChild);
    var st = document.createElement("style");
    st.textContent = CSS;
    document.head.appendChild(st);
    return true;
  }

  function hideMultiplayer() {
    if (!STATIC) return;
    var nodes = document.querySelectorAll("#title .picks");
    for (var i = 0; i < nodes.length; i++) {
      var head = nodes[i].querySelector("p");
      if (head && head.textContent.trim() === UI.multiplayer) nodes[i].style.display = "none";
    }
  }

  function autoRedirect() {
    if (LANG !== "en" || STATIC === false) return;
    try { if (localStorage.getItem("daw:lang")) return; } catch (e) { }
    if (/[?&](room|url)=/.test(location.search)) return;
    var here = location.pathname.replace(/index\.html$/, "");
    if (here !== BASE) return;
    var nav = (navigator.language || "").toLowerCase();
    var want = nav.indexOf("zh") === 0 ? "zh" : nav.indexOf("ja") === 0 ? "ja" : nav.indexOf("ko") === 0 ? "ko" : "en";
    if (want !== "en") location.replace(BASE + DIRS[want] + "/" + location.search);
  }

  function boot() {
    if (!mountSwitcher()) return setTimeout(boot, 200);
    hideMultiplayer();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
  autoRedirect();
})();
