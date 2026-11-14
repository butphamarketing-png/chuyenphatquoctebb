(function () {
  var rows = window.BB_POSTAL || [];
  function fold(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "d").toLowerCase();
  }
  var q = document.getElementById("post-q");
  var out = document.getElementById("post-out");
  var prov = document.getElementById("post-prov");
  if (!q || !out || !rows.length) return;
  q.form.addEventListener("submit", function (event) { event.preventDefault(); });

  var provinces = [];
  rows.forEach(function (row) {
    if (provinces.indexOf(row[1]) === -1) provinces.push(row[1]);
  });
  provinces.sort(function (a, b) { return fold(a).localeCompare(fold(b)); });
  provinces.forEach(function (name) {
    var opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name.replace(/^Thành phố /, "").replace(/^Tỉnh /, "");
    prov.appendChild(opt);
  });

  document.querySelectorAll("[data-post]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      q.value = btn.getAttribute("data-post");
      prov.value = "";
      paint();
    });
  });

  function paint() {
    var query = fold(q.value.trim());
    var province = prov.value;
    if (query.length < 2 && !province) {
      out.innerHTML = "<p>Gõ ít nhất 2 chữ, hoặc chọn tỉnh. Ví dụ: Sài Gòn, Hoàn Kiếm, 71016.</p>";
      return;
    }
    var hits = rows.filter(function (row) {
      if (province && row[1] !== province) return false;
      if (!query) return true;
      return fold(row[0] + " " + row[1]).indexOf(query) !== -1 || row[2].indexOf(query) === 0;
    });
    if (!hits.length) {
      out.innerHTML = "<p class=\"warn\">Không thấy phường, xã này. Tra thêm trên <a href=\"https://mabuuchinh.vn/\" target=\"_blank\" rel=\"noopener\">mabuuchinh.vn</a>.</p>";
      return;
    }
    var shown = hits.slice(0, 40);
    out.innerHTML = shown.map(function (row) {
      return "<div class=\"prov\"><div><b>" + row[0] + "</b><p>" + row[1] + "</p></div><button type=\"button\" class=\"ghost\" data-copy=\"" + row[2] + "\">" + row[2] + "</button></div>";
    }).join("") + (hits.length > shown.length ? "<p>Còn " + (hits.length - shown.length) + " dòng. Gõ thêm tên hoặc chọn tỉnh.</p>" : "<p>" + hits.length + " kết quả.</p>");
  }

  out.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-copy]");
    if (!btn) return;
    var code = btn.getAttribute("data-copy");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(function () {
        btn.textContent = "Đã chép " + code;
      });
    }
  });

  q.addEventListener("input", paint);
  prov.addEventListener("change", paint);
  paint();
})();
