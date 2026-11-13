(function () {
  var steps = [].slice.call(document.querySelectorAll(".flow-steps li"));
  if (!steps.length) return;
  var n = 0;

  function paint() {
    steps.forEach(function (el, i) {
      el.classList.toggle("lit", i <= n);
      el.classList.toggle("hot", i === n);
    });
  }

  paint();
  window.setInterval(function () {
    n += 1;
    if (n >= steps.length) {
      steps.forEach(function (el) {
        el.classList.remove("lit", "hot");
      });
      n = -1;
      return;
    }
    paint();
  }, 900);
})();
