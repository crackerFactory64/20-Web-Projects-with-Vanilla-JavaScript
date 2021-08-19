let price = document.getElementById("film").value;
const seats = document.querySelectorAll(".screen-container .seat");
let selected = document.querySelectorAll(".row .selected");
let selectedCount = document.querySelectorAll(
  ".screen-container .selected"
).length;
let seatCount = document.getElementById("seat-count");
let cost = document.getElementById("cost");

const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const selectedFilmIndex = localStorage.getItem("selectedFilmIndex");
  const selectedFilmPrice = localStorage.getItem("selectedFilmPrice");

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });

    selectedCount = document.querySelectorAll(".row .selected").length;
    seatCount.innerHTML = selectedCount;
  }

  if (selectedFilmIndex !== null) {
    document.getElementById("film").selectedIndex = selectedFilmIndex;
  }

  if (selectedFilmPrice !== null) {
    price = selectedFilmPrice;
    cost.innerHTML = selectedCount * price;
  }
};

populateUI();

for (let i = 0; i < seats.length; i++) {
  seats[i].onclick = () => {
    if (seats[i].classList.contains("occupied") == false) {
      seats[i].classList.toggle("selected");
    }

    selectedCount = document.querySelectorAll(
      ".screen-container .selected"
    ).length;
    let selected = document.querySelectorAll(".row .selected");
    const seatIndex = [...selected].map((seat) => [...seats].indexOf(seat));

    localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

    seatCount.innerHTML = selectedCount;
    cost.innerHTML = selectedCount * price;
  };
}

document.getElementById("film").onchange = () => {
  localStorage.setItem(
    "selectedFilmIndex",
    document.getElementById("film").selectedIndex
  );

  localStorage.setItem(
    "selectedFilmPrice",
    document.getElementById("film").value
  );

  price = document.getElementById("film").value;
  cost.innerHTML = selectedCount * price;
};
