const lines = document.querySelector("#lines");
const add = document.querySelector("#add-line");
const cbmOut = document.querySelector("#cbm-out");
const volForm = document.querySelector("#vol-form");
const volOut = document.querySelector("#vol-out");

function line() {
  const row = document.createElement("div");
  row.className = "line";
  row.innerHTML = `
    <input name="l" type="number" min="0" step="0.1" placeholder="Dài cm" aria-label="Dài cm">
    <input name="w" type="number" min="0" step="0.1" placeholder="Rộng cm" aria-label="Rộng cm">
    <input name="h" type="number" min="0" step="0.1" placeholder="Cao cm" aria-label="Cao cm">
    <input name="q" type="number" min="1" step="1" value="1" placeholder="Số kiện" aria-label="Số kiện">
    <button type="button" class="ghost">Xóa</button>
  `;
  row.querySelector("button").addEventListener("click", () => {
    if (lines.children.length > 1) row.remove();
    calcCbm();
  });
  row.querySelectorAll("input").forEach((input) => input.addEventListener("input", calcCbm));
  lines.append(row);
}

function num(input) {
  const value = Number(input.value);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function calcCbm() {
  let cbm = 0;
  let pieces = 0;
  [...lines.children].forEach((row) => {
    const [l, w, h, q] = [...row.querySelectorAll("input")].map(num);
    if (!l || !w || !h || !q) return;
    cbm += (l * w * h / 1_000_000) * q;
    pieces += q;
  });
  const kg = num(document.querySelector("#actual-kg"));
  let hint = "Dưới 22 kg thường đi chuyển phát nhanh.";
  if (kg >= 250 || cbm >= 1.5) hint = "Từ 250 kg hoặc 1,5 CBM, hỏi báo riêng đường biển.";
  else if (kg >= 22) hint = "Từ 22 kg có thể đi hàng gom đường biển.";
  cbmOut.innerHTML = `<p>Tổng kiện: <strong>${pieces}</strong></p><p>Tổng CBM: <strong>${cbm.toFixed(3)}</strong></p><p>${hint}</p><p>Đây là gợi ý kích thước, không phải báo giá.</p>`;
}

add.addEventListener("click", () => line());
document.querySelector("#actual-kg").addEventListener("input", calcCbm);
line();

volForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(volForm);
  const l = Number(data.get("l"));
  const w = Number(data.get("w"));
  const h = Number(data.get("h"));
  const actual = Number(data.get("kg"));
  const divisor = Number(data.get("divisor"));
  if (![l, w, h, actual, divisor].every((n) => Number.isFinite(n) && n > 0)) {
    volOut.innerHTML = '<p class="warn">Nhập đủ kích thước, kg thực và hệ số.</p>';
    return;
  }
  const volumetric = (l * w * h) / divisor;
  const chargeable = Math.max(actual, volumetric);
  volOut.innerHTML = `<p>Kg quy đổi: <strong>${volumetric.toFixed(2)}</strong></p><p>Kg tính cước: <strong>${chargeable.toFixed(2)}</strong></p><p>Kết quả không phải báo giá.</p>`;
});
