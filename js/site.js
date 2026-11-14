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
  var inArticles = /\/bai-viet\//.test(path);
  var root = lang === "vi" ? (inArticles ? "../" : "") : "../";
  var actions = document.querySelector(".header-actions");
  if (actions && !actions.querySelector(".lang-select")) {
    var sel = document.createElement("select");
    sel.className = "lang-select";
    sel.setAttribute("aria-label", "Ngôn ngữ");
    var file = path.split("/").filter(Boolean).pop() || "index.html";
    var viToEn = {
      "index.html": "index.html",
      "gioi-thieu.html": "about.html",
      "dich-vu.html": "services.html",
      "quoc-gia.html": "countries.html",
      "bai-viet.html": "articles.html",
      "bao-gia.html": "quote.html",
      "tra-cuu.html": "tracking.html",
      "cong-cu.html": "tools.html",
      "lien-he.html": "contact.html",
      "hang-cam.html": "restricted.html",
      "hs-code.html": "hs.html",
      "ma-buu-chinh.html": "postal.html",
      "dieu-khoan.html": "terms.html",
      "bao-mat.html": "privacy.html",
      "boi-thuong.html": "claims.html",
      "khieu-nai.html": "complaints.html",
      "hang-dhl.html": "dhl.html",
      "hang-fedex.html": "fedex.html",
      "hang-ups.html": "ups.html",
      "phan-hoi.html": "reviews.html"
    };
    var articleMap = {
      "gui-hang-di-my.html": "article-us.html",
      "sau-tuyen-pho-bien.html": "article-routes.html",
      "cach-tinh-cuoc.html": "article-rates.html",
      "can-the-tich.html": "article-cbm.html",
      "tra-cuu-van-don.html": "article-tracking.html",
      "gui-pin-laptop.html": "article-batteries.html",
      "giay-to-gui-hang.html": "article-papers.html",
      "gui-hang-co-dong-thue-khong.html": "article-duty.html",
      "dong-goi-hang.html": "article-packing.html",
      "khai-gia-tri-hang.html": "article-value.html",
      "gui-qua-va-hanh-ly-du-hoc.html": "article-gifts.html",
      "gui-hang-duong-bien.html": "article-sea.html",
      "ban-tin-quy-dinh.html": "article-rules.html"
    };
    var enArticle = {};
    Object.keys(articleMap).forEach(function (key) { enArticle[articleMap[key]] = key; });
    var enToVi = {};
    Object.keys(viToEn).forEach(function (key) { enToVi[viToEn[key]] = key; });
    var viHref = root + "index.html";
    var enHref = root + "en/index.html";
    if (lang === "en" && enArticle[file]) {
      viHref = "../bai-viet/" + enArticle[file];
      enHref = file;
    } else if (lang === "en") {
      viHref = "../" + (enToVi[file] || "index.html");
      enHref = enToVi[file] ? file : "index.html";
    } else if (lang === "vi" && articleMap[file] && inArticles) {
      viHref = file;
      enHref = "../en/" + articleMap[file];
    } else if (lang === "vi" && inArticles) {
      viHref = file;
      enHref = "../en/articles.html";
    } else if (lang === "vi") {
      viHref = file;
      enHref = "en/" + (viToEn[file] || "index.html");
    }
    [
      ["vi", "VI", viHref],
      ["en", "EN", enHref],
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
