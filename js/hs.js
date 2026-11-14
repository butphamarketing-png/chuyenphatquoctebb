(function () {
  var chapters = [
    ["01", "Động vật sống"], ["02", "Thịt và phụ phẩm"], ["03", "Cá và thủy sản"], ["04", "Sữa, trứng, mật ong"], ["05", "Sản phẩm động vật khác"],
    ["06", "Cây sống và hoa"], ["07", "Rau và củ"], ["08", "Quả và hạt"], ["09", "Cà phê, trà, gia vị"], ["10", "Ngũ cốc"],
    ["11", "Bột và tinh bột"], ["12", "Hạt dầu, cây công nghiệp"], ["13", "Nhựa thực vật"], ["14", "Vật liệu kết bện"], ["15", "Mỡ và dầu"],
    ["16", "Thịt, cá đã chế biến"], ["17", "Đường"], ["18", "Ca cao"], ["19", "Bánh, ngũ cốc chế biến"], ["20", "Rau quả chế biến"],
    ["21", "Thực phẩm hỗn hợp"], ["22", "Đồ uống, rượu"], ["23", "Thức ăn chăn nuôi"], ["24", "Thuốc lá"], ["25", "Muối, đá, xi măng"],
    ["26", "Quặng"], ["27", "Nhiên liệu khoáng"], ["28", "Hóa chất vô cơ"], ["29", "Hóa chất hữu cơ"], ["30", "Dược phẩm"],
    ["31", "Phân bón"], ["32", "Sơn, mực"], ["33", "Tinh dầu, mỹ phẩm"], ["34", "Xà phòng, sáp"], ["35", "Keo, enzym"],
    ["36", "Thuốc nổ, diêm"], ["37", "Vật liệu ảnh"], ["38", "Hóa chất hỗn hợp"], ["39", "Nhựa"], ["40", "Cao su"],
    ["41", "Da"], ["42", "Đồ da, túi, vali"], ["43", "Lông thú"], ["44", "Gỗ"], ["45", "Nút bần"],
    ["46", "Mây, tre"], ["47", "Bột giấy"], ["48", "Giấy, bìa"], ["49", "Sách, báo"], ["50", "Tơ tằm"],
    ["51", "Lông cừu"], ["52", "Bông"], ["53", "Sợi thực vật khác"], ["54", "Sợi filament nhân tạo"], ["55", "Xơ staple nhân tạo"],
    ["56", "Nỉ, dây"], ["57", "Thảm"], ["58", "Vải đặc biệt"], ["59", "Vải kỹ thuật"], ["60", "Vải dệt kim"],
    ["61", "Quần áo dệt kim"], ["62", "Quần áo không dệt kim"], ["63", "Hàng dệt thành phẩm"], ["64", "Giày dép"], ["65", "Mũ"],
    ["66", "Ô, ba toong"], ["67", "Lông vũ, hoa giả"], ["68", "Đá, xi măng chế tạo"], ["69", "Gốm sứ"], ["70", "Thủy tinh"],
    ["71", "Đá quý, kim loại quý"], ["72", "Sắt thép"], ["73", "Đồ sắt thép"], ["74", "Đồng"], ["75", "Niken"],
    ["76", "Nhôm"], ["78", "Chì"], ["79", "Kẽm"], ["80", "Thiếc"], ["81", "Kim loại khác"],
    ["82", "Dụng cụ cầm tay"], ["83", "Đồ kim loại khác"], ["84", "Máy cơ khí"], ["85", "Máy điện, điện tử"], ["86", "Đầu máy xe lửa"],
    ["87", "Ô tô và phụ tùng"], ["88", "Máy bay"], ["89", "Tàu thuyền"], ["90", "Dụng cụ quang học, y tế"], ["91", "Đồng hồ"],
    ["92", "Nhạc cụ"], ["93", "Vũ khí"], ["94", "Đồ nội thất"], ["95", "Đồ chơi, thể thao"], ["96", "Hàng tạp"],
    ["97", "Tác phẩm nghệ thuật"]
  ];
  var goods = [
    { keys: "ca phe nhan ca phe", code: "0901.11", name: "Cà phê chưa rang, chưa khử cafein", chap: "09" },
    { keys: "ca phe rang ca phe", code: "0901.21", name: "Cà phê đã rang, chưa khử cafein", chap: "09" },
    { keys: "tra che", code: "0902.30", name: "Trà đen, gói không quá 3 kg", chap: "09" },
    { keys: "tieu hat tieu", code: "0904.11", name: "Hạt tiêu chưa xay", chap: "09" },
    { keys: "gao", code: "1006.30", name: "Gạo đã xay", chap: "10" },
    { keys: "mat ong", code: "0409.00", name: "Mật ong tự nhiên", chap: "04" },
    { keys: "hat dieu dieu", code: "0801.32", name: "Hạt điều đã bóc vỏ", chap: "08" },
    { keys: "so co la ca cao", code: "1806.90", name: "Sô cô la và chế phẩm ca cao khác", chap: "18" },
    { keys: "banh keo banh", code: "1905.90", name: "Bánh và bánh quy, loại khác", chap: "19" },
    { keys: "nuoc mam nuoc cham", code: "2103.90", name: "Nước chấm và gia vị hỗn hợp, loại khác", chap: "21" },
    { keys: "ao thun ao phong", code: "6109.10", name: "Áo phông dệt kim bằng bông", chap: "61" },
    { keys: "quan ao nam quan", code: "6203.42", name: "Quần dài nam bằng bông, không dệt kim", chap: "62" },
    { keys: "giay dep giay da", code: "6403.99", name: "Giày mũ da, đế cao su hoặc nhựa, loại khác", chap: "64" },
    { keys: "tui xach tui", code: "4202.22", name: "Túi có mặt ngoài bằng chất dẻo hoặc vải", chap: "42" },
    { keys: "vali", code: "4202.12", name: "Vali có mặt ngoài bằng chất dẻo hoặc vải", chap: "42" },
    { keys: "dien thoai smartphone", code: "8517.13", name: "Điện thoại thông minh", chap: "85" },
    { keys: "laptop may tinh", code: "8471.30", name: "Máy xử lý dữ liệu xách tay, không quá 10 kg", chap: "84" },
    { keys: "pin lithium sac", code: "8507.60", name: "Ắc quy lithium-ion", chap: "85" },
    { keys: "tivi man hinh", code: "8528.72", name: "Màn hình thu truyền hình màu", chap: "85" },
    { keys: "may in", code: "8443.32", name: "Máy in nối được với máy xử lý dữ liệu", chap: "84" },
    { keys: "my pham kem", code: "3304.99", name: "Mỹ phẩm chăm sóc da, loại khác", chap: "33" },
    { keys: "nuoc hoa", code: "3303.00", name: "Nước hoa và nước thơm", chap: "33" },
    { keys: "thuoc", code: "3004.90", name: "Thuốc đã đóng gói để bán lẻ, loại khác", chap: "30" },
    { keys: "sach", code: "4901.99", name: "Sách in, loại khác", chap: "49" },
    { keys: "noi that do go", code: "9403.60", name: "Đồ nội thất bằng gỗ, loại khác", chap: "94" },
    { keys: "gom su chen dia", code: "6912.00", name: "Bộ đồ ăn bằng gốm", chap: "69" },
    { keys: "do choi", code: "9503.00", name: "Đồ chơi, xe đồ chơi, búp bê", chap: "95" },
    { keys: "dong ho", code: "9102.11", name: "Đồng hồ đeo tay, chỉ hiển thị điện tử", chap: "91" },
    { keys: "kinh mat", code: "9004.90", name: "Kính đeo mắt, loại khác", chap: "90" },
    { keys: "phu tung o to", code: "8708.99", name: "Phụ tùng ô tô, loại khác", chap: "87" },
    { keys: "do nhua", code: "3926.90", name: "Đồ bằng nhựa, loại khác", chap: "39" }
  ];

  function fold(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "d").toLowerCase();
  }

  var q = document.getElementById("hs-q");
  var out = document.getElementById("hs-out");
  var box = document.getElementById("hs-chapters");
  if (!q || !out || !box) return;
  q.form.addEventListener("submit", function (event) { event.preventDefault(); });

  chapters.forEach(function (chap) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ghost";
    btn.textContent = chap[0] + " " + chap[1];
    btn.addEventListener("click", function () {
      q.value = chap[0];
      paint();
      out.scrollIntoView({ block: "nearest" });
    });
    box.appendChild(btn);
  });

  function paint() {
    var query = fold(q.value.trim());
    var digits = query.replace(/\D/g, "");
    if (!query) {
      out.innerHTML = document.documentElement.lang === "en"
        ? "<p>Type a product name or a chapter number. Chapter titles on this tool are in Vietnamese. Example: cà phê, điện thoại, 61.</p>"
        : "<p>Gõ tên hàng hoặc số chương. Ví dụ: cà phê, điện thoại, 61.</p>";
      return;
    }
    var chapHits = chapters.filter(function (chap) {
      return chap[0].indexOf(digits) === 0 && digits.length >= 2 || fold(chap[1]).indexOf(query) !== -1;
    });
    var goodHits = goods.filter(function (item) {
      var blob = fold(item.name + " " + item.keys + " " + item.code);
      return blob.indexOf(query) !== -1 || (digits.length >= 2 && item.code.replace(/\D/g, "").indexOf(digits) === 0);
    });
    if (!chapHits.length && !goodHits.length) {
      out.innerHTML = document.documentElement.lang === "en"
        ? "<p class=\"warn\">No matching code. Do not guess a nearby code. Call 0941 192 193.</p>"
        : "<p class=\"warn\">Không thấy mã khớp. Đừng lấy một mã gần giống. Gọi 0941 192 193 để đối chiếu tên hàng.</p>";
      return;
    }
    var html = "";
    chapHits.slice(0, 8).forEach(function (chap) {
      html += "<div class=\"hs-hit\"><b>Chương " + chap[0] + "</b><p>" + chap[1] + "</p></div>";
    });
    goodHits.slice(0, 12).forEach(function (item) {
      html += "<div class=\"hs-hit\"><b>" + item.code + "</b><p>" + item.name + " · chương " + item.chap + "</p><p>Mã 6 số để tham khảo. Mã 8 số trên tờ khai do hải quan chốt. Trang này không tính thuế.</p></div>";
    });
    out.innerHTML = html;
  }

  q.addEventListener("input", paint);
  paint();
})();
