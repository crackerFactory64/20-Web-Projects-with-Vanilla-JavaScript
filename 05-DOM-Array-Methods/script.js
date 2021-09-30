const addUserButton = document.getElementById("add");
const doubleMoneyButton = document.getElementById("double");
const filterButton = document.getElementById("filter");
const sortButton = document.getElementById("sort");
const calcButton = document.getElementById("calc");

const outputWindow = document.querySelector(".window__output");
const total = document.querySelector(".app__total");

addUserButton.addEventListener("click", () => {
  getRandomUser();
});

doubleMoneyButton.addEventListener("click", () => {
  doubleMoney();
});

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    wealth: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, wealth: user.wealth * 2 };
  });

  updateDOM();
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

function updateDOM() {
  output = "";
  data.forEach((obj) => {
    output += `<p class="window__person"><span class="window__name">${
      obj.name
    }</span><span class="window__wealth">${formatWealth(
      obj.wealth
    )}</span></p>`;
  });
  outputWindow.innerHTML = output;
}

function formatWealth(figure) {
  /*let figureArray = figure.toString().split("");

  if (figureArray.length == 5) {
    figureArray.splice(2, 0, ",");
  } else if (figureArray.length == 6) {         
    figureArray.splice(3, 0, ",");
  } else if (figureArray.length == 7) {
    figureArray.splice(1, 0, ",");
    figureArray.splice(5, 0, ",");
  }

  return `£${figureArray.join("")}`;*/

  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return formatter.format(figure);
}
