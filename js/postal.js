(function () {
  var provinces = [
    { name: "An Giang", codes: "90, 91, 92" },
    { name: "Bắc Ninh", codes: "16, 26" },
    { name: "Cà Mau", codes: "97, 98" },
    { name: "Cao Bằng", codes: "21" },
    { name: "Cần Thơ", codes: "94, 95, 96" },
    { name: "Đà Nẵng", codes: "50, 51, 52" },
    { name: "Đắk Lắk", codes: "56, 63, 64" },
    { name: "Điện Biên", codes: "32" },
    { name: "Đồng Nai", codes: "67, 76" },
    { name: "Đồng Tháp", codes: "81, 84" },
    { name: "Gia Lai", codes: "55, 61, 62" },
    { name: "Hà Nội", codes: "10, 11, 12, 13, 14", alias: "ha noi hanoi" },
    { name: "Hà Tĩnh", codes: "45, 46" },
    { name: "Hải Phòng", codes: "03, 04, 05", alias: "hai phong" },
    { name: "Hồ Chí Minh", codes: "70, 71, 72, 73, 74, 75, 78", alias: "sai gon saigon tphcm tp hcm hcm thanh pho ho chi minh" },
    { name: "Huế", codes: "49", alias: "hue thua thien" },
    { name: "Hưng Yên", codes: "06, 17" },
    { name: "Khánh Hòa", codes: "57, 59" },
    { name: "Lai Châu", codes: "30" },
    { name: "Lạng Sơn", codes: "25" },
    { name: "Lào Cai", codes: "31, 33" },
    { name: "Lâm Đồng", codes: "65, 66, 77" },
    { name: "Ninh Bình", codes: "07, 08, 18" },
    { name: "Nghệ An", codes: "43, 44" },
    { name: "Phú Thọ", codes: "15, 35, 36" },
    { name: "Quảng Ninh", codes: "01, 02" },
    { name: "Quảng Ngãi", codes: "53, 54, 60" },
    { name: "Quảng Trị", codes: "47, 48" },
    { name: "Sơn La", codes: "34" },
    { name: "Tây Ninh", codes: "80, 82, 83" },
    { name: "Tuyên Quang", codes: "20, 22" },
    { name: "Thái Nguyên", codes: "23, 24" },
    { name: "Thanh Hóa", codes: "40, 41, 42" },
    { name: "Vĩnh Long", codes: "85, 86, 87" }
  ];

  function fold(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "d").toLowerCase();
  }

  var q = document.getElementById("post-q");
  var out = document.getElementById("post-out");
  if (!q || !out) return;
  q.form.addEventListener("submit", function (event) { event.preventDefault(); });

  function paint() {
    var query = fold(q.value.trim());
    var hits = provinces.filter(function (item) {
      if (!query) return true;
      return fold(item.name + " " + (item.alias || "")).indexOf(query) !== -1;
    });
    if (!hits.length) {
      out.innerHTML = "<p class=\"warn\">Không thấy tỉnh này trong danh sách 34 tỉnh, thành. Mã phường, xã tra trên cổng chính thức.</p>";
      return;
    }
    out.innerHTML = hits.map(function (item) {
      return "<div class=\"prov\"><b>" + item.name + "</b><p>Nhóm mã tỉnh: " + item.codes + "</p></div>";
    }).join("");
  }

  q.addEventListener("input", paint);
  paint();
})();
