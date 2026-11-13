(function () {
  var motion = document.documentElement.classList.contains("motion");
  var nodes = document.querySelectorAll("[data-reveal]");

  function show(el) {
    if (el.classList.contains("in")) return;
    if (el.getAttribute("data-reveal") === "item" && el.parentElement) {
      var siblings = Array.prototype.filter.call(el.parentElement.children, function (child) {
        return child.getAttribute && child.getAttribute("data-reveal") === "item";
      });
      var index = siblings.indexOf(el);
      if (index >= 0) el.style.animationDelay = ((index + 1) * 80) + "ms";
    }
    el.classList.add("in");
  }

  if (motion && nodes.length) {
    nodes.forEach(function (el) {
      el.addEventListener("animationend", function (event) {
        if (event.target !== el) return;
        el.style.animationName = "none";
      });
    });

    var pending = Array.prototype.slice.call(nodes);
    var ticking = false;
    function scan() {
      var line = window.innerHeight * 0.8;
      pending = pending.filter(function (el) {
        if (el.getBoundingClientRect().top > line) return true;
        show(el);
        return false;
      });
      if (!pending.length) window.removeEventListener("scroll", onScroll);
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        ticking = false;
        scan();
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    scan();
  }

  var home = document.querySelector('.nav > a[href="index.html"]');
  var aboutLink = document.querySelector('.nav-item > a[href="gioi-thieu.html"]');
  var serviceLink = document.querySelector('.nav-item > a[href="dich-vu.html"]');
  var contactLink = document.querySelector('.nav > a[href="lien-he.html"]');
  var about = document.querySelector(".about-sec");
  var service = document.querySelector(".carriers");
  var contact = document.querySelector(".consult");
  if (!home || !about || !service || !contact) return;

  var spyLinks = [home, aboutLink, serviceLink, contactLink].filter(Boolean);
  function spy() {
    var line = window.innerHeight * 0.34;
    var pick = home;
    if (contact.getBoundingClientRect().top < line) pick = contactLink;
    else if (about.getBoundingClientRect().top < line) pick = aboutLink;
    else if (service.getBoundingClientRect().top < line) pick = serviceLink;
    spyLinks.forEach(function (link) { link.classList.toggle("active", link === pick); });
  }
  window.addEventListener("scroll", spy, { passive: true });
  spy();
})();
