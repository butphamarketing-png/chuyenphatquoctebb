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
