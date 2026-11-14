(function () {
  var cols = ["us", "ca", "au", "gb", "kr", "jp"];
  var en = document.documentElement.lang === "en";
  var labels = en
    ? { ok: "Accept if declared", call: "Call first", no: "Do not accept" }
    : { ok: "Nhận nếu khai đúng", call: "Gọi trước", no: "Không nhận" };
  var rows = [
    { name: "Quần áo, giày dép", en: "Clothes and shoes", keys: "quan ao giay clothes shoes", us: "ok", ca: "ok", au: "ok", gb: "ok", kr: "ok", jp: "ok" },
    { name: "Sách, tài liệu in", en: "Books and printed papers", keys: "sach tai lieu books paper", us: "ok", ca: "ok", au: "ok", gb: "ok", kr: "ok", jp: "ok" },
    { name: "Cà phê, trà gói kín", en: "Sealed coffee and tea", keys: "ca phe tra coffee tea", us: "call", ca: "call", au: "call", gb: "call", kr: "call", jp: "call" },
    { name: "Bánh kẹo đóng gói", en: "Packaged snacks", keys: "banh keo snack", us: "call", ca: "call", au: "call", gb: "call", kr: "call", jp: "call" },
    { name: "Thịt, ruốc, đồ tươi, hải sản khô", en: "Meat, fresh food, dried seafood", keys: "thit ruoc tuoi hai san meat fresh", us: "no", ca: "no", au: "no", gb: "no", kr: "no", jp: "no" },
    { name: "Hạt giống, cây, đất", en: "Seeds, plants, soil", keys: "hat giong cay dat seeds plants soil", us: "no", ca: "no", au: "no", gb: "no", kr: "no", jp: "no" },
    { name: "Đồ gỗ", en: "Wood", keys: "go do go wood", us: "call", ca: "call", au: "call", gb: "call", kr: "call", jp: "call" },
    { name: "Thuốc, thực phẩm chức năng", en: "Medicine and supplements", keys: "thuoc tpcn dong y medicine", us: "call", ca: "call", au: "call", gb: "call", kr: "call", jp: "call" },
    { name: "Mỹ phẩm, dầu gội", en: "Cosmetics and shampoo", keys: "my pham dau goi cosmetics", us: "call", ca: "call", au: "call", gb: "call", kr: "call", jp: "call" },
    { name: "Điện thoại, laptop còn pin trong máy", en: "Phones and laptops with the battery inside", keys: "dien thoai laptop pin phone", us: "call", ca: "call", au: "call", gb: "call", kr: "call", jp: "call" },
    { name: "Pin rời, sạc dự phòng", en: "Loose batteries and power banks", keys: "pin roi sac du phong battery power bank", us: "no", ca: "no", au: "no", gb: "no", kr: "no", jp: "no" },
    { name: "Nước hoa, sơn móng, bình xịt", en: "Perfume, nail polish, aerosols", keys: "nuoc hoa son mong xit perfume aerosol", us: "no", ca: "no", au: "no", gb: "no", kr: "no", jp: "no" },
    { name: "Tiền mặt, vàng", en: "Cash and gold", keys: "tien vang cash gold", us: "no", ca: "no", au: "no", gb: "no", kr: "no", jp: "no" },
    { name: "Vũ khí, đạn, dao", en: "Weapons, ammunition, knives", keys: "vu khi dan dao weapon knife", us: "no", ca: "no", au: "no", gb: "no", kr: "no", jp: "no" },
    { name: "Hàng giả, hàng nhái", en: "Counterfeit goods", keys: "hang gia nhai fake counterfeit", us: "no", ca: "no", au: "no", gb: "no", kr: "no", jp: "no" }
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
      return !query || fold(row.name + " " + row.en + " " + row.keys).indexOf(query) !== -1;
    });
    var empty = en
      ? "Not in this list. Call 0941 192 193 before you ship it."
      : "Không thấy mặt hàng này. Gọi 0941 192 193 trước khi gửi.";
    body.innerHTML = hits.map(function (row) {
      return "<tr><th scope=\"row\">" + (en ? row.en : row.name) + "</th>" + cols.map(function (col) {
        return "<td>" + badge(row[col]) + "</td>";
      }).join("") + "</tr>";
    }).join("") || "<tr><td colspan=\"7\">" + empty + "</td></tr>";
  }

  q.addEventListener("input", paint);
  paint();
})();
