const openModal = document.getElementById("sign-up");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const openCloseMenu = document.getElementById("menu-button");
const menu = document.getElementById("menu");
const container = document.querySelectorAll(".container");

openCloseMenu.addEventListener("click", () => {
  menu.classList.toggle("menu--open");
  container.forEach((element) => {
    element.classList.toggle("container--sidebar");
  });
  openCloseMenu.classList.toggle("menu-button--sidebar");
});
