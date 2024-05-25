const nav = document.querySelector<HTMLElement>("nav")!;

nav
  .querySelector<HTMLDivElement>(".expand")!
  .addEventListener("click", () => nav.classList.add("expanded"));

nav
  .querySelector<HTMLDivElement>(".hide")!
  .addEventListener("click", () => nav.classList.remove("expanded"));
