(function () {
  var form = document.getElementById("consult-form");
  if (!form) return;
  var msg = form.querySelector(".consult-msg");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var name = String(data.get("name") || "").trim();
    var phone = String(data.get("phone") || "").replace(/[^\d+]/g, "");
    var email = String(data.get("email") || "").trim();
    var need = String(data.get("need") || "").trim();
    var note = String(data.get("note") || "").trim();
    var digits = phone.replace(/\D/g, "");

    var nameInput = form.querySelector("[name=name]");
    var phoneInput = form.querySelector("[name=phone]");
    var emailInput = form.querySelector("[name=email]");
    var needInput = form.querySelector("[name=need]");
    var emailOk = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    function mark(input, error) {
      input.classList.toggle("bad", Boolean(error));
      input.setAttribute("aria-invalid", error ? "true" : "false");
      var label = input.closest("label");
      var note = label.querySelector(".field-err");
      if (!note) {
        note = document.createElement("span");
        note.className = "field-err";
        label.appendChild(note);
      }
      note.textContent = error || "";
    }

    mark(nameInput, name ? "" : "Điền họ và tên.");
    mark(phoneInput, digits.length >= 9 ? "" : "Số điện thoại chưa đủ.");
    mark(emailInput, emailOk ? "" : "Email chưa đúng định dạng.");
    mark(needInput, need ? "" : "Chọn nhu cầu dịch vụ.");

    if (!name || digits.length < 9 || !need || !emailOk) {
      msg.textContent = "";
      msg.className = "consult-msg";
      return;
    }

    var leads = [];
    try { leads = JSON.parse(localStorage.getItem("bb-leads") || "[]"); } catch (e) { leads = []; }
    leads.push({ name: name, phone: phone, email: email, need: need, note: note, at: new Date().toISOString() });
    localStorage.setItem("bb-leads", JSON.stringify(leads));
    form.reset();
    form.querySelectorAll(".bad").forEach(function (input) { input.classList.remove("bad"); });
    form.querySelectorAll(".field-err").forEach(function (note) { note.textContent = ""; });
    msg.textContent = "Đã nhận yêu cầu. B&B sẽ gọi lại số " + phone + ".";
    msg.className = "consult-msg ok";
  });

  form.addEventListener("input", function (event) {
    var input = event.target;
    if (!input.classList || !input.classList.contains("bad")) return;
    input.classList.remove("bad");
    input.removeAttribute("aria-invalid");
    var note = input.closest("label").querySelector(".field-err");
    if (note) note.textContent = "";
  });
})();
