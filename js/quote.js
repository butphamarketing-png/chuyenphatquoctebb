const money = new Intl.NumberFormat("vi-VN");

function bands(first, step) {
  const rows = [];
  for (let i = 1; i <= 40; i += 1) rows.push([i / 2, first + (i - 1) * step]);
  return rows;
}

const RATES = {
  US: { name: "Mỹ", days: "5–8", bands: bands(480000, 430000), tiers: [[21, 44, 420000], [45, 99, 380000], [100, 500, 340000]] },
  CA: { name: "Canada", days: "7–14", bands: bands(520000, 400000), tiers: [[21, 44, 390000], [45, 99, 350000], [100, 500, 310000]] },
  AU: { name: "Úc", days: "5–10", bands: bands(390000, 280000), tiers: [[21, 44, 260000], [45, 99, 230000], [100, 500, 200000]] },
  GB: { name: "Anh", days: "6–12", bands: bands(450000, 360000), tiers: [[21, 44, 340000], [45, 99, 300000], [100, 500, 270000]] },
  DE: { name: "Đức", days: "8–15", bands: bands(470000, 370000), tiers: [[21, 44, 350000], [45, 99, 310000], [100, 500, 280000]] },
  KR: { name: "Hàn Quốc", phone: true },
  JP: { name: "Nhật Bản", phone: true }
};

function parseKg(value) {
  const kg = Number(String(value).replace(",", "."));
  if (!Number.isFinite(kg) || kg < 0.1 || kg > 500) return null;
  return kg;
}

function quote(code, kg) {
  const card = RATES[code];
  if (!card || card.phone) return { card, kg, phone: true };
  if (kg <= 20) {
    const billed = Math.ceil(kg * 2) / 2;
    const band = card.bands.find((row) => row[0] >= billed);
    return { card, kg, billed, vnd: band[1], mode: "band" };
  }
  const billed = Math.ceil(kg);
  const tier = card.tiers.find((row) => billed >= row[0] && billed <= row[1]);
  return { card, kg, billed, vnd: billed * tier[2], perKg: tier[2], mode: "tier" };
}

const en = document.documentElement.lang === "en";
const EN_NAME = { US: "United States", CA: "Canada", AU: "Australia", GB: "United Kingdom", DE: "Germany", KR: "South Korea", JP: "Japan" };
function placeName(card, code) { return en ? EN_NAME[code] : card.name; }

const form = document.querySelector("#quote-form");
const result = document.querySelector("#quote-result");
const params = new URLSearchParams(location.search);
if (params.get("country") && RATES[params.get("country")]) {
  form.country.value = params.get("country");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const code = form.country.value;
  const kg = parseKg(form.weight.value);
  if (!code) {
    result.innerHTML = en ? '<p class="warn">Choose a destination.</p>' : '<p class="warn">Chọn nước nhận.</p>';
    return;
  }
  if (kg === null) {
    result.innerHTML = en ? '<p class="warn">Enter a weight from 0.1 to 500 kg.</p>' : '<p class="warn">Nhập số kg từ 0,1 đến 500.</p>';
    return;
  }
  const card = RATES[code];
  const name = placeName(card, code);
  if (card.phone) {
    result.innerHTML = en
      ? `<p><strong>${name}</strong> is quoted by phone.</p><p><a class="btn" href="tel:0941192193">Call 0941 192 193</a></p>`
      : `<p><strong>${name}</strong> báo giá qua điện thoại.</p><p><a class="btn" href="tel:0941192193">Gọi 0941 192 193</a></p>`;
    return;
  }
  const q = quote(code, kg);
  const withVat = form.vat.checked ? Math.round(q.vnd * 1.08) : null;
  const detail = q.mode === "band"
    ? (en ? `Chargeable weight ${q.billed} kg` : `Cân tính cước ${q.billed} kg`)
    : `${q.billed} kg × ${money.format(q.perKg)} ₫/kg`;
  const zalo = `https://zalo.me/0941192193?text=${encodeURIComponent(`B&B sample price: ${name}, ${kg} kg, ${money.format(q.vnd)} VND, ${card.days} days`)}`;
  const tag = en ? "Sample price. This is not the B&amp;B rate card." : "Giá minh họa, chưa phải bảng giá của B & B";
  const vatLine = withVat
    ? (en ? `Before VAT: ${money.format(q.vnd)} ₫ · Multiplied by 1.08 to preview` : `Chưa VAT: ${money.format(q.vnd)} ₫ · Đã nhân 1,08 để xem`)
    : (en ? "VAT 8% is not included" : "Chưa gồm VAT 8%");
  const daysLine = en ? `Typical time: <strong>${card.days} days</strong>` : `Thời gian tham khảo: <strong>${card.days} ngày</strong>`;
  const zaloLabel = en ? "Send on Zalo" : "Gửi Zalo";
  result.innerHTML = `
    <p class="tag">${tag}</p>
    <div class="price">${money.format(withVat ?? q.vnd)} ₫</div>
    <p>${vatLine}</p>
    <p>${detail}</p>
    <p>${daysLine}</p>
    <p><a class="btn" href="${zalo}" target="_blank" rel="noopener">${zaloLabel}</a></p>
  `;
});
