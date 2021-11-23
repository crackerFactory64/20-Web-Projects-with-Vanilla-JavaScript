const listEL = document.getElementById("list");
const checkBtn = document.getElementById("check");

const top10 = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Godfather: Part II",
  "The Dark Knight",
  "12 Angry Men",
  "Schindler's List",
  "The Lord of the Rings: The Return of the King",
  "Pulp Fiction",
  "The Good, the Bad, and the Ugly",
  "The Lord of the Rings: Fellowship of the Ring",
];

const listItemsEl = [];

const shuffledList = shuffle([...top10]);

populateList(shuffledList);

const draggables = document.querySelectorAll(".item__draggable");

function populateList(arr) {
  let rank = 1;
  arr.forEach((film, index) => {
    let listItem = document.createElement("li");
    listItem.classList.add("list__item");
    listItem.setAttribute("data-index", index);
    listItem.innerHTML = ` <h2 class="item__rank">${rank}</h2>
    <div class="item__draggable" draggable="true">
        <h2 class="item__title">${film}</h2>
        <p class="item__icon"><i class="fas fa-grip-lines"></i></p>
    </div>`;
    listEL.appendChild(listItem);
    rank++;
    listItemsEl.push(listItem);
  });
}

function shuffle(array) {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

draggables.forEach((el) => {
  el.addEventListener("dragstart", (e) => {});
});
