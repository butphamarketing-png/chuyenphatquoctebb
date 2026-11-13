const form = document.querySelector("#track-form");
const hint = document.querySelector("#track-hint");

function clean(value) {
  return value.replace(/[\s\-.]/g, "").toUpperCase();
}

function detect(code) {
  if (/^1Z[0-9A-Z]{16}$/.test(code)) return "ups";
  if (/^\d{10}$/.test(code)) return "dhl";
  if (/^(\d{12}|\d{15}|\d{20}|\d{22})$/.test(code)) return "fedex";
  return null;
}

function urlFor(carrier, code) {
  const id = encodeURIComponent(code);
  if (carrier === "dhl") return `https://www.dhl.com/vn-vi/home/tracking.html?submit=1&tracking-id=${id}`;
  if (carrier === "fedex") return `https://www.fedex.com/fedextrack/?trknbr=${id}&locale=vi_VN`;
  return `https://www.ups.com/track?loc=vi_VN&tracknum=${id}&requester=ST/trackdetails`;
}

const names = { ups: "UPS", dhl: "DHL", fedex: "FedEx" };
const preset = new URLSearchParams(location.search).get("code");
if (preset) form.code.value = preset;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const code = clean(form.code.value);
  if (!code) {
    hint.className = "warn";
    hint.textContent = "Nhập mã vận đơn.";
    return;
  }
  const carrier = detect(code);
  if (!carrier) {
    hint.className = "warn";
    hint.textContent = "Không nhận ra hãng. Kiểm tra lại mã.";
    return;
  }
  hint.className = "";
  hint.textContent = `Nhận diện: ${names[carrier]}. Đang mở trang của hãng.`;
  window.open(urlFor(carrier, code), "_blank", "noopener");
});
