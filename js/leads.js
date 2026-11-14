(function () {
  var table = document.getElementById("lead-table");
  var clear = document.getElementById("lead-clear");
  if (!table) return;

  function read() {
    try { return JSON.parse(localStorage.getItem("bb-leads") || "[]"); } catch (e) { return []; }
  }

  function write(leads) {
    localStorage.setItem("bb-leads", JSON.stringify(leads));
    paint();
  }

  function paint() {
    var leads = read();
    table.replaceChildren();
    if (!leads.length) {
      table.textContent = "Chưa có yêu cầu nào trên trình duyệt này.";
      return;
    }
    var wrap = document.createElement("div");
    wrap.className = "lead-scroll";
    var el = document.createElement("table");
    el.innerHTML = "<thead><tr><th>Lúc gửi</th><th>Họ tên</th><th>Điện thoại</th><th>Email</th><th>Nhu cầu</th><th>Nội dung</th><th></th></tr></thead>";
    var body = document.createElement("tbody");
    leads.forEach(function (lead, index) {
      var row = document.createElement("tr");
      var when = lead.at ? new Date(lead.at) : null;
      var cells = [
        when && !Number.isNaN(when.getTime()) ? when.toLocaleString("vi-VN") : "",
        lead.name || "",
        lead.phone || "",
        lead.email || "",
        lead.need || "",
        lead.note || ""
      ];
      cells.forEach(function (value) {
        var cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });
      var action = document.createElement("td");
      var button = document.createElement("button");
      button.type = "button";
      button.className = "btn light";
      button.textContent = "Xóa";
      button.addEventListener("click", function () {
        var next = read();
        next.splice(index, 1);
        write(next);
      });
      action.appendChild(button);
      row.appendChild(action);
      body.appendChild(row);
    });
    el.appendChild(body);
    wrap.appendChild(el);
    table.appendChild(wrap);
  }

  clear.addEventListener("click", function () {
    if (!read().length) return;
    write([]);
  });
  paint();
})();
