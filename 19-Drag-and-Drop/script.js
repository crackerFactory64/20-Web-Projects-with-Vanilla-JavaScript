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
    <div class="item__draggable"  draggable="true" ondragover="event.preventDefault();" ondragenter="event.preventDefault();">
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

function replaceFilm(film, e) {
  const targetFilm = e.target.innerText;
  draggables.forEach((el) => {
    if (el.innerText === film) {
      el.childNodes[1].innerHTML = targetFilm;
    }
  });
}

function checkList() {
  let list = document.querySelectorAll(".list__item");
  let i = 0;
  list.forEach((li) => {
    let title = li.childNodes[3].childNodes[1];
    title.classList.remove("item__draggable--right");
    title.classList.remove("item__draggable--wrong");
    if (title.innerHTML === top10[i]) {
      title.classList.add("item__draggable--right");
    } else {
      title.classList.add("item__draggable--wrong");
    }
    i++;
  });
}

draggables.forEach((el) => {
  el.addEventListener("dragstart", (e) => {
    setTimeout(() => {
      el.classList.add("item__draggable--held");
    }, 0);
    e.dataTransfer.setData("text/plain", e.target.innerText);
  });
  el.addEventListener("dragenter", (e) => {
    e.preventDefault();
    el.classList.add("item__draggable--over");
  });
  el.addEventListener("dragleave", () => {
    el.classList.remove("item__draggable--over");
  });
  el.addEventListener("dragend", () => {
    el.classList.remove("item__draggable--held");
  });
  el.addEventListener("drop", (e) => {
    data = e.dataTransfer.getData("text");

    if (e.target.classList.contains("item__draggable")) {
      e.target.classList.remove("item__draggable--over");
    } else {
      e.target.parentNode.classList.remove("item__draggable--over");
    }
    replaceFilm(data, e);
    el.childNodes[1].innerHTML = data;
  });
});

checkBtn.addEventListener("click", () => {
  checkList();
});
