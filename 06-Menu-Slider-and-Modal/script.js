const openModal = document.getElementById("sign-up");
const modal = document.getElementById("modal");
const modalBG = document.querySelector(".modal-bg");
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

openModal.addEventListener("click", () => {
  openCloseModal();
});

closeModal.addEventListener("click", () => {
  openCloseModal();
});

// hides modal is user clicks outside of it
window.addEventListener("click", (e) => {
  if (e.target == modalBG) {
    modal.classList.remove("modal--active");
    modalBG.classList.remove("modal-bg--active");
  }
});

function openCloseModal() {
  modal.classList.toggle("modal--active");
  modalBG.classList.toggle("modal-bg--active");
}
