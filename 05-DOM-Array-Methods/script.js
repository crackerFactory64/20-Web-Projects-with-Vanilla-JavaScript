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

filterButton.addEventListener("click", () => {
  filterMillionaires();
});

sortButton.addEventListener("click", () => {
  sortByRichest();
});

calcButton.addEventListener("click", () => {
  calculateWealth();
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

function sortByRichest() {
  data = data.sort((a, b) => {
    return b.wealth - a.wealth;
  });

  updateDOM();
}

function filterMillionaires() {
  data = data.filter((obj) => {
    return obj.wealth >= 1000000;
  });

  updateDOM();
}

function calculateWealth() {
  let result = 0;
  result = data.reduce((total, obj) => {
    return total + obj.wealth;
  }, 0);

  total.innerHTML = `<span>Total Wealth: </span>${formatWealth(result)}`;
  total.style.visibility = "visible";
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
  const wealthFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return wealthFormatter.format(figure);
}
