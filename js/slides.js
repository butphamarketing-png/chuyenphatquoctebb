const banner = document.querySelector(".banner");
if (banner) {
  const photos = [...banner.querySelectorAll("img")];
  const dots = banner.querySelector(".dots");
  let index = 0;
  let timer;

  photos.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ảnh ${i + 1}`);
    dot.addEventListener("click", () => show(i));
    dots.append(dot);
  });

  function show(next) {
    index = (next + photos.length) % photos.length;
    photos.forEach((photo, i) => photo.classList.toggle("on", i === index));
    [...dots.children].forEach((dot, i) => dot.classList.toggle("on", i === index));
    clearInterval(timer);
    timer = setInterval(() => show(index + 1), 5000);
  }

  banner.querySelector(".prev").addEventListener("click", () => show(index - 1));
  banner.querySelector(".next").addEventListener("click", () => show(index + 1));
  show(0);
}
