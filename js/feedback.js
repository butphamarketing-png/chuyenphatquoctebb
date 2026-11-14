(function () {
  var root = document.getElementById("review-list");
  if (!root) return;
  var slides = [
    { text: "Very good nha. Nhân viên vui vẻ, nhiệt tình, tư vấn rõ ràng minh bạch. Vote 5 sao.", time: "08:56" },
    { text: "Hàng đi nhanh hơn em nghĩ. Giá báo rõ, không phát sinh thêm.", time: "18:08" },
    { text: "Gửi thứ bảy, đầu tuần người nhận đã có hàng. Đóng gói kỹ.", time: "13:47" }
  ];
  var dialog = document.createElement("dialog");
  dialog.className = "shot";
  root.after(dialog);

  slides.forEach(function (slide, index) {
    var card = document.createElement("article");
    card.className = "quote-card";
    card.innerHTML = '<span class="qmark" aria-hidden="true">“</span><p class="quote-text"></p><div class="quote-foot"><span class="avatar" aria-hidden="true"></span><div><strong>Khách hàng minh họa</strong><span class="stars" aria-label="5 sao">★★★★★</span></div><time class="quote-time"></time></div>';
    card.querySelector(".quote-text").textContent = slide.text;
    card.querySelector(".quote-time").textContent = slide.time;
    var button = document.createElement("button");
    button.type = "button";
    button.className = "btn light";
    button.textContent = "Xem tin nhắn";
    button.addEventListener("click", function () {
      dialog.innerHTML = '<p class="msg in">Cần gửi hàng đi Mỹ, bên mình nhận không ạ?</p><p class="msg out">Dạ nhận ạ. Em báo giá theo số kg.</p><p class="msg in quote-mini"></p><p class="chat-meta"><span></span><span class="heart">♥ 1</span></p><form method="dialog"><button class="btn">Đóng</button></form>';
      dialog.querySelector(".quote-mini").textContent = slide.text;
      dialog.querySelector(".chat-meta span").textContent = slide.time;
      dialog.showModal();
    });
    var item = document.createElement("div");
    item.className = "review-item";
    item.appendChild(card);
    item.appendChild(button);
    root.appendChild(item);
  });
})();
