const container = document.getElementById("container");
const text = document.getElementById("text");

breath();

setInterval(() => {
  breath();
}, 5000);

function breath() {
  text.innerHTML = "Breath in...";
  container.classList.add("in");
  setTimeout(() => {
    text.innerHTML = "And hold...";
  }, 2000);
  setTimeout(() => {
    container.classList.remove("in");
    container.classList.add("out");
    text.innerHTML = "Breath out...";
  }, 3000);
  container.classList.remove("out");
}
