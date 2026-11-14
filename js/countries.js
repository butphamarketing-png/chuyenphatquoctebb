(function () {
  var QUOTE = { US: 1, CA: 1, AU: 1, GB: 1, DE: 1, KR: 1, JP: 1 };
  var PAGES = {
    US: "gui-hang-di-my.html",
    AU: "gui-hang-di-uc.html",
    CA: "gui-hang-di-canada.html",
    GB: "gui-hang-di-anh.html",
    KR: "gui-hang-di-han-quoc.html",
    JP: "gui-hang-di-nhat-ban.html"
  };
  var COUNTRIES = [
    { code: "US", name: "Mỹ", region: "bac-my", lane: 1 },
    { code: "CA", name: "Canada", region: "bac-my", lane: 1 },
    { code: "MX", name: "Mexico", region: "bac-my" },
    { code: "JP", name: "Nhật Bản", region: "chau-a", lane: 1 },
    { code: "KR", name: "Hàn Quốc", region: "chau-a", lane: 1 },
    { code: "CN", name: "Trung Quốc", region: "chau-a", lane: 1 },
    { code: "HK", name: "Hồng Kông", region: "chau-a", lane: 1 },
    { code: "TW", name: "Đài Loan", region: "chau-a", lane: 1 },
    { code: "SG", name: "Singapore", region: "chau-a", lane: 1 },
    { code: "MY", name: "Malaysia", region: "chau-a", lane: 1 },
    { code: "TH", name: "Thái Lan", region: "chau-a", lane: 1 },
    { code: "KH", name: "Campuchia", region: "chau-a", lane: 1 },
    { code: "LA", name: "Lào", region: "chau-a", lane: 1 },
    { code: "ID", name: "Indonesia", region: "chau-a" },
    { code: "PH", name: "Philippines", region: "chau-a", lane: 1 },
    { code: "IN", name: "Ấn Độ", region: "chau-a" },
    { code: "AE", name: "UAE", region: "chau-a", lane: 1 },
    { code: "GB", name: "Anh", region: "chau-au", lane: 1 },
    { code: "DE", name: "Đức", region: "chau-au", lane: 1 },
    { code: "FR", name: "Pháp", region: "chau-au", lane: 1 },
    { code: "NL", name: "Hà Lan", region: "chau-au", lane: 1 },
    { code: "BE", name: "Bỉ", region: "chau-au", lane: 1 },
    { code: "PL", name: "Ba Lan", region: "chau-au", lane: 1 },
    { code: "DK", name: "Đan Mạch", region: "chau-au", lane: 1 },
    { code: "NO", name: "Na Uy", region: "chau-au", lane: 1 },
    { code: "FI", name: "Phần Lan", region: "chau-au", lane: 1 },
    { code: "CZ", name: "Séc", region: "chau-au", lane: 1 },
    { code: "SE", name: "Thụy Điển", region: "chau-au", lane: 1 },
    { code: "CH", name: "Thụy Sĩ", region: "chau-au", lane: 1 },
    { code: "RU", name: "Nga", region: "chau-au", lane: 1 },
    { code: "UA", name: "Ukraine", region: "chau-au", lane: 1 },
    { code: "IT", name: "Ý", region: "chau-au" },
    { code: "ES", name: "Tây Ban Nha", region: "chau-au" },
    { code: "AT", name: "Áo", region: "chau-au" },
    { code: "AU", name: "Úc", region: "chau-dai-duong", lane: 1 },
    { code: "NZ", name: "New Zealand", region: "chau-dai-duong", lane: 1 },
    { code: "BR", name: "Brazil", region: "nam-my" },
    { code: "AR", name: "Argentina", region: "nam-my" },
    { code: "CL", name: "Chile", region: "nam-my" },
    { code: "ZA", name: "Nam Phi", region: "chau-phi" },
    { code: "EG", name: "Ai Cập", region: "chau-phi" }
  ];
  var POPULAR = ["US", "CA", "AU", "SG", "JP", "KR", "DE"];
  var byCode = {};
  COUNTRIES.forEach(function (item) { byCode[item.code] = item; });

  var grid = document.querySelector("#country-grid");
  var empty = document.querySelector("#country-empty");
  var search = document.querySelector("#country-search");
  var tabs = document.querySelector("#region-tabs");
  var popular = document.querySelector("#country-popular");
  if (!grid) return;

  var region = "chuyen";

  function fold(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d").toLowerCase();
  }

  function hrefOf(item) {
    if (PAGES[item.code]) return PAGES[item.code];
    if (QUOTE[item.code]) return "bao-gia.html?country=" + item.code;
    return "lien-he.html";
  }

  function flag(code) {
    return "https://flagcdn.com/w40/" + code.toLowerCase() + ".png";
  }

  function card(item) {
    var link = document.createElement("a");
    link.className = "country-card";
    link.href = hrefOf(item);
    var img = document.createElement("img");
    img.src = flag(item.code);
    img.alt = "";
    img.width = 28;
    img.height = 20;
    var name = document.createElement("span");
    name.textContent = item.name;
    var arrow = document.createElement("i");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "›";
    link.appendChild(img);
    link.appendChild(name);
    link.appendChild(arrow);
    return link;
  }

  function matches(item, query) {
    if (query) {
      var folded = fold(item.name);
      var byWord = folded.split(/\s+/).some(function (part) { return part.indexOf(query) === 0; });
      var byCode = fold(item.code).indexOf(query) === 0;
      if (!byWord && !byCode) return false;
    }
    if (query) return true;
    if (region === "all") return true;
    if (region === "chuyen") return !!item.lane;
    return item.region === region;
  }

  function render() {
    var query = fold(search.value.trim());
    var list = COUNTRIES.filter(function (item) { return matches(item, query); });
    list.sort(function (a, b) { return a.name.localeCompare(b.name, "vi"); });
    grid.replaceChildren();
    list.forEach(function (item) { grid.appendChild(card(item)); });
    empty.hidden = list.length > 0;
  }

  POPULAR.forEach(function (code) {
    var item = byCode[code];
    var link = document.createElement("a");
    link.href = hrefOf(item);
    var img = document.createElement("img");
    img.src = flag(code);
    img.alt = "";
    link.appendChild(img);
    link.appendChild(document.createTextNode(item.name));
    popular.appendChild(link);
  });

  tabs.addEventListener("click", function (event) {
    var button = event.target.closest("button");
    if (!button) return;
    region = button.getAttribute("data-region");
    Array.prototype.forEach.call(tabs.children, function (el) {
      el.classList.toggle("on", el === button);
    });
    render();
  });

  search.addEventListener("input", render);
  render();
})();
