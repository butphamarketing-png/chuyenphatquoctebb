(function () {
  var stage = document.querySelector(".carrier-stage");
  if (!stage) return;
  var track = stage.querySelector(".carriers");
  var dotsBox = stage.querySelector(".carrier-dots");
  var mq = window.matchMedia("(max-width: 1040px)");
  var originals = Array.prototype.slice.call(track.children);
  var count = originals.length;
  var index = 1;
  var pointer = null;
  var startX = 0;
  var dragX = 0;
  var dragged = false;

  function cloneOf(card) {
    var copy = card.cloneNode(true);
    copy.setAttribute("data-clone", "1");
    copy.setAttribute("aria-hidden", "true");
    copy.removeAttribute("data-reveal");
    copy.classList.remove("in");
    copy.style.animationDelay = "";
    Array.prototype.forEach.call(copy.querySelectorAll("a"), function (link) {
      link.tabIndex = -1;
    });
    return copy;
  }

  function widthOf() {
    var card = track.children[0];
    var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
    return { card: card.offsetWidth, gap: gap };
  }

  function shift(animate) {
    var size = widthOf();
    var x = stage.clientWidth / 2 - (index * (size.card + size.gap) + size.card / 2) + dragX;
    track.style.transition = animate ? "transform .45s ease" : "none";
    track.style.transform = "translate3d(" + x + "px,0,0)";
    var real = ((index - 1) % count + count) % count;
    Array.prototype.forEach.call(track.children, function (card, i) {
      card.classList.toggle("is-on", i === index);
    });
    Array.prototype.forEach.call(dotsBox.children, function (dot, i) {
      dot.classList.toggle("on", i === real);
      if (i === real) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  }

  function go(next) {
    dragX = 0;
    index = next;
    shift(true);
  }

  function onEnd(event) {
    if (event.target !== track || event.propertyName !== "transform") return;
    if (index === 0) {
      index = count;
      shift(false);
    } else if (index === count + 1) {
      index = 1;
      shift(false);
    }
  }

  function onDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (event.target.closest("a, button")) return;
    pointer = event.pointerId;
    startX = event.clientX;
    dragX = 0;
    dragged = false;
    stage.setPointerCapture(event.pointerId);
  }

  function onMove(event) {
    if (pointer !== event.pointerId) return;
    dragX = event.clientX - startX;
    if (Math.abs(dragX) > 8) dragged = true;
    shift(false);
  }

  function onUp(event) {
    if (pointer !== event.pointerId) return;
    pointer = null;
    if (dragX <= -48) go(index + 1);
    else if (dragX >= 48) go(index - 1);
    else go(index);
  }

  function onClick(event) {
    if (!dragged) return;
    event.preventDefault();
    event.stopPropagation();
    dragged = false;
  }

  function setup() {
    if (track.dataset.loop) return;
    track.insertBefore(cloneOf(originals[count - 1]), originals[0]);
    track.appendChild(cloneOf(originals[0]));
    track.dataset.loop = "1";
    dotsBox.hidden = false;
    originals.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Hãng " + (i + 1));
      dot.addEventListener("click", function () { go(i + 1); });
      dotsBox.appendChild(dot);
    });
    index = 2;
    shift(false);
    track.addEventListener("transitionend", onEnd);
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);
    stage.addEventListener("click", onClick, true);
  }

  function teardown() {
    if (!track.dataset.loop) return;
    Array.prototype.forEach.call(track.querySelectorAll("[data-clone]"), function (el) { el.remove(); });
    delete track.dataset.loop;
    track.style.transform = "";
    track.style.transition = "";
    dotsBox.hidden = true;
    dotsBox.innerHTML = "";
    Array.prototype.forEach.call(track.children, function (el) { el.classList.remove("is-on"); });
    track.removeEventListener("transitionend", onEnd);
    stage.removeEventListener("pointerdown", onDown);
    stage.removeEventListener("pointermove", onMove);
    stage.removeEventListener("pointerup", onUp);
    stage.removeEventListener("pointercancel", onUp);
    stage.removeEventListener("click", onClick, true);
  }

  function enable() {
    if (mq.matches) setup();
    else teardown();
  }

  window.addEventListener("resize", function () {
    if (mq.matches && track.dataset.loop) shift(false);
  });

  if (mq.addEventListener) mq.addEventListener("change", enable);
  else mq.addListener(enable);
  enable();
})();
