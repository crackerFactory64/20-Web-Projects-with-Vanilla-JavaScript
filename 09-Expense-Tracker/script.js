const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const history = document.getElementById("history");
const deleteButtons = document.getElementsByClassName("history__delete");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const error = document.getElementById("error");
const addButton = document.getElementById("button");

let transactions = [];

function validateForm() {
  if (!nameInput.value || !amountInput.value) {
    error.style.visibility = "visible";
  } else {
    error.style.visibility = "hidden";
    addNewTransaction();
  }
}

function addNewTransaction() {
  let name = nameInput.value.trim();
  let amount = amountInput.value.trim();
  let transaction = {
    ID: Math.floor(Math.random() * 1000000),
    name: name,
    amount: parseFloat(amount),
  };

  transactions.push(transaction);

  populateHistory();
  /*if (amountInput.value < 0) {
    eventHTML += `
        <div class="history__event">
            <button class="history__delete">X</button>
            <p class="event__name">${name}</p>
            <p class="event__amount">${amount}</p>
        </div>
      `;
  } else {
    eventHTML += `
      <div class="history__event history__event--pos">
        <button class="history__delete">X</button>
        <p class="event__name">${name}</p>
        <p class="event__amount">+${amount}</p>
      </div>
    `;
  }

  history.innerHTML += eventHTML;
  calculateTotals();*/
}

function populateHistory() {
  let output = "";

  transactions.forEach((transaction) => {
    if (transaction.amount < 0) {
      output += `
        <div class="history__event">
          <p class="history__delete">X</p>
          <p>${transaction.name}</p>
          <p>${formatMoney(transaction.amount)}</p>
        </div>
      `;
    } else {
      output += `
        <div class="history__event history__event--pos">
          <p class="history__delete">X</p>
          <p>${transaction.name}</p>
          <p>+${formatMoney(transaction.amount)}</p>
        </div>
      `;
    }
  });

  history.innerHTML = output;
  calculateTotals();
}

function calculateTotals() {
  let amounts = transactions.map((transaction) => transaction.amount);
  let balance = amounts.reduce((total, amount) => {
    return (total += amount);
  });
  balanceEl.innerHTML = formatMoney(balance);

  let income = amounts.filter((amount) => amount >= 0);
  if (income.length > 0) {
    income = income.reduce((total, amount) => {
      return (total += amount);
    });
    incomeEl.innerHTML = formatMoney(income);
  }

  let expense = amounts.filter((amount) => amount < 0);
  if (expense.length > 0) {
    expense = expense.reduce((total, amount) => {
      return (total += amount);
    });
    expenseEl.innerHTML = formatMoney(expense * -1);
  }
}
/*
function updateDOM() {
  if (balance >= 0) {
    balanceEl.classList.add("balance__sum--pos");
  } else {
    balanceEl.classList.remove("balance__sum--pos");
  }

  balanceEl.innerHTML = formatMoney(balance);
  incomeEl.innerHTML = formatMoney(income);
  expenseEl.innerHTML = formatMoney(expense).replace(/-/g, "");

  nameInput.value = "";
  amountInput.value = "";
}*/

function formatMoney(figure) {
  const moneyFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return moneyFormatter.format(figure);
}

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  validateForm();
});
