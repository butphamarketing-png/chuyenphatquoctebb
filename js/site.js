const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
menuBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

(function () {
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "to-top";
  btn.setAttribute("aria-label", "Lên đầu trang");
  btn.innerHTML = '<svg viewBox="0 0 36 36" aria-hidden="true"><circle class="ring" cx="18" cy="18" r="16"></circle><path d="M18 23V14M13.5 17.5 18 13l4.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  document.body.appendChild(btn);
  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? window.scrollY / max : 0;
    btn.style.setProperty("--p", String(p));
    btn.classList.toggle("show", window.scrollY > 400);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

document.querySelectorAll(".nav-item > a").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (window.matchMedia("(max-width: 1040px)").matches) {
      event.preventDefault();
      link.parentElement.classList.toggle("open");
    }
  });
});

(function () {
  var path = location.pathname.replace(/\\/g, "/");
  var lang = "vi";
  if (/\/en\//.test(path)) lang = "en";
  else if (/\/ko\//.test(path)) lang = "ko";
  else if (/\/ja\//.test(path)) lang = "ja";
  else if (/\/zh-tw\//.test(path)) lang = "zh-tw";
  var root = lang === "vi" ? (/\/bai-viet\//.test(path) ? "../" : "") : "../";
  var actions = document.querySelector(".header-actions");
  if (actions && !actions.querySelector(".lang-select")) {
    var sel = document.createElement("select");
    sel.className = "lang-select";
    sel.setAttribute("aria-label", "Ngôn ngữ");
    [
      ["vi", "VI", root + "index.html"],
      ["en", "EN", root + "en/index.html"],
      ["ko", "KO", root + "ko/index.html"],
      ["ja", "JA", root + "ja/index.html"],
      ["zh-tw", "繁", root + "zh-tw/index.html"]
    ].forEach(function (item) {
      var opt = document.createElement("option");
      opt.value = item[2];
      opt.textContent = item[1];
      if (item[0] === lang) opt.selected = true;
      sel.appendChild(opt);
    });
    sel.addEventListener("change", function () { location.href = sel.value; });
    actions.insertBefore(sel, actions.firstChild);
  }
  var topBtn = document.querySelector(".to-top");
  if (topBtn && lang !== "vi") {
    topBtn.setAttribute("aria-label", { en: "Back to top", ko: "맨 위로", ja: "ページ上部へ", "zh-tw": "回到頂端" }[lang]);
  }
  if (lang !== "vi") return;
  document.querySelectorAll(".foot-links").forEach(function (ul) {
    var about = ul.querySelector('a[href="' + root + 'gioi-thieu.html"]');
    if (!about) return;
    [
      ["hs-code.html", "Mã HS"],
      ["ma-buu-chinh.html", "Mã bưu chính"],
      ["hang-cam.html", "Hàng cấm"]
    ].forEach(function (pair) {
      var href = root + pair[0];
      if (ul.querySelector('a[href="' + href + '"]')) return;
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = href;
      a.textContent = pair[1];
      li.appendChild(a);
      ul.appendChild(li);
    });
  });
})();
