(function () {
  var root = document.querySelector(".reviews");
  if (!root) return;
  var slides = [
    {
      text: "Very good nha. Nhân viên vui vẻ, nhiệt tình, tư vấn rõ ràng minh bạch. Vote 5 sao.",
      time: "08:56"
    },
    {
      text: "Hàng đi nhanh hơn em nghĩ. Giá báo rõ, không phát sinh thêm.",
      time: "18:08"
    },
    {
      text: "Gửi thứ bảy, đầu tuần người nhận đã có hàng. Đóng gói kỹ.",
      time: "13:47"
    }
  ];
  var text = root.querySelector(".quote-text");
  var time = root.querySelector(".quote-time");
  var mini = root.querySelector(".quote-mini");
  var chatTime = root.querySelector(".chat-time");
  var dots = root.querySelector(".rev-dots");
  var index = 0;

  slides.forEach(function (_, i) {
    var button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", "Phản hồi " + (i + 1));
    button.addEventListener("click", function () { show(i); });
    dots.appendChild(button);
  });

  function paint(slide) {
    text.textContent = slide.text;
    time.textContent = slide.time;
    if (mini) mini.textContent = slide.text;
    if (chatTime) chatTime.textContent = slide.time;
    text.style.opacity = "1";
    if (mini) mini.style.opacity = "1";
  }

  function show(i) {
    index = (i + slides.length) % slides.length;
    var slide = slides[index];
    [].forEach.call(dots.children, function (dot, n) {
      dot.classList.toggle("on", n === index);
    });
    if (text.textContent && text.textContent !== slide.text) {
      text.style.opacity = "0";
      if (mini) mini.style.opacity = "0";
      window.setTimeout(function () { paint(slide); }, 180);
      return;
    }
    paint(slide);
  }

  root.querySelector(".rev-prev").addEventListener("click", function () { show(index - 1); });
  root.querySelector(".rev-next").addEventListener("click", function () { show(index + 1); });
  show(0);
  window.setInterval(function () { show(index + 1); }, 4000);
})();
