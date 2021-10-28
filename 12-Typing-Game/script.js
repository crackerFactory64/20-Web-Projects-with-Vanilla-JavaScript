const options = document.getElementById("options");

const toggleButton = document.getElementById("toggle");

toggleButton.addEventListener("click", () => {
  options.classList.toggle("options--hide");
});
