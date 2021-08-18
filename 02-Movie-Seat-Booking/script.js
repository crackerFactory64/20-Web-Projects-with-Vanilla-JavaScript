let price = document.getElementById("film").value;
const seats = document.getElementsByClassName("seat");
let selected = document.getElementsByClassName("selected").length - 1;
let seatCount = document.getElementById("seat-count");
let cost = document.getElementById("cost");

for (let i = 3; i < seats.length; i++) {
  seats[i].onclick = () => {
    price = document.getElementById("film").value;
    seats[i].classList.toggle("selected");
    selected = document.getElementsByClassName("selected").length - 1;
    seatCount.innerHTML = selected;
    cost.innerHTML = selected * price;
  };
}
