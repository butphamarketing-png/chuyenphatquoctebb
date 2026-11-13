(function () {
  var list = document.querySelector(".values");
  if (!list) return;
  var items = [].slice.call(list.querySelectorAll("li"));
  var hop = list.querySelector(".hop");
  if (!items.length || !hop) return;
  var index = 0;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function place() {
    var row = items[index];
    hop.style.top = row.offsetTop + 12 + "px";
  }

  place();
  window.addEventListener("resize", place);
  if (reduce) return;
  window.setInterval(function () {
    index = (index + 1) % items.length;
    place();
  }, 1400);
})();
