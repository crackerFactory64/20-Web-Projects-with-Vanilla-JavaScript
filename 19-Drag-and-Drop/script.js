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

populateList();

function populateList() {
  let rank = 1;
  top10.forEach((film) => {
    let listItem = document.createElement("li");
    listItem.classList.add("list__item");
    listItem.innerHTML = ` <h2 class="item__rank">${rank}</h2>
    <h2 class="item__title">${film}</h2>
    <p class="item__icon"><i class="fas fa-grip-lines"></i></p>`;
    listEL.appendChild(listItem);
    rank++;
  });
}
