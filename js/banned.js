(function () {
  var cols = ["us", "ca", "au", "gb", "kr", "jp"];
  var labels = { ok: "Nhận nếu khai đúng", call: "Gọi trước", no: "Không nhận" };
  var rows = [
    { name: "Quần áo, giày dép", keys: "quan ao giay", us: "ok", ca: "ok", au: "ok", gb: "ok", kr: "ok", jp: "ok" },
    { name: "Sách, tài liệu in", keys: "sach tai lieu", us: "ok", ca: "ok", au: "ok", gb: "ok", kr: "ok", jp: "ok" },
    { name: "Cà phê, trà gói kín", keys: "ca phe tra", us: "call", ca: "call", au: "call", gb: "call", kr: "call", jp: "call" },
    { name: "Bánh kẹo đóng gói", keys: "banh keo", us: "call", ca: "call", au: "call", gb: "call", kr: "call", jp: "call" },
    { name: "Thịt, ruốc, đồ tươi, hải sản khô", keys: "thit ruoc tuoi hai san", us: "no", ca: "no", au: "no", gb: "no", kr: "no", jp: "no" },
    { name: "Hạt giống, cây, đất", keys: "hat giong cay dat", us: "no", ca: "no", au: "no", gb: "no", kr: "no", jp: "no" },
    { name: "Đồ gỗ", keys: "go do go", us: "call", ca: "call", au: "call", gb: "call", kr: "call", jp: "call" },
    { name: "Thuốc, thực phẩm chức năng", keys: "thuoc tpcn dong y", us: "call", ca: "call", au: "call", gb: "call", kr: "call", jp: "call" },
    { name: "Mỹ phẩm, dầu gội", keys: "my pham dau goi", us: "call", ca: "call", au: "call", gb: "call", kr: "call", jp: "call" },
    { name: "Điện thoại, laptop còn pin trong máy", keys: "dien thoai laptop pin", us: "call", ca: "call", au: "call", gb: "call", kr: "call", jp: "call" },
    { name: "Pin rời, sạc dự phòng", keys: "pin roi sac du phong", us: "no", ca: "no", au: "no", gb: "no", kr: "no", jp: "no" },
    { name: "Nước hoa, sơn móng, bình xịt", keys: "nuoc hoa son mong xit", us: "no", ca: "no", au: "no", gb: "no", kr: "no", jp: "no" },
    { name: "Tiền mặt, vàng", keys: "tien vang", us: "no", ca: "no", au: "no", gb: "no", kr: "no", jp: "no" },
    { name: "Vũ khí, đạn, dao", keys: "vu khi dan dao", us: "no", ca: "no", au: "no", gb: "no", kr: "no", jp: "no" },
    { name: "Hàng giả, hàng nhái", keys: "hang gia nhai", us: "no", ca: "no", au: "no", gb: "no", kr: "no", jp: "no" }
  ];

  function fold(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "d").toLowerCase();
  }

  var q = document.getElementById("ban-q");
  var body = document.getElementById("ban-body");
  if (!q || !body) return;
  q.form.addEventListener("submit", function (event) { event.preventDefault(); });

  function badge(kind) {
    return "<span class=\"badge " + kind + "\">" + labels[kind] + "</span>";
  }

  function paint() {
    var query = fold(q.value.trim());
    var hits = rows.filter(function (row) {
      return !query || fold(row.name + " " + row.keys).indexOf(query) !== -1;
    });
    body.innerHTML = hits.map(function (row) {
      return "<tr><th scope=\"row\">" + row.name + "</th>" + cols.map(function (col) {
        return "<td>" + badge(row[col]) + "</td>";
      }).join("") + "</tr>";
    }).join("") || "<tr><td colspan=\"7\">Không thấy mặt hàng này. Gọi 0941 192 193 trước khi gửi.</td></tr>";
  }

  q.addEventListener("input", paint);
  paint();
})();
