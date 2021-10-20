const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const history = document.getElementById("history");
const deleteButtons = document.getElementsByClassName("history__delete");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const error = document.getElementById("error");
const addButton = document.getElementById("button");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions = [];

if (localStorageTransactions) {
  transactions = localStorageTransactions;
}

populateHistory();

function validateForm() {
  if (!nameInput.value || !amountInput.value) {
    error.style.visibility = "visible";
  } else {
    error.style.visibility = "hidden";
    addNewTransaction();
    nameInput.value = "";
    amountInput.value = "";
  }
}

function addNewTransaction() {
  let name = nameInput.value.trim();
  let amount = amountInput.value.trim();
  let transaction = {
    id: Math.floor(Math.random() * 1000000),
    name: name,
    amount: parseFloat(amount),
  };

  transactions.push(transaction);

  populateHistory();
}

function populateHistory() {
  let output = "";

  transactions.forEach((transaction) => {
    if (transaction.amount < 0) {
      output += `
        <div class="history__event">
          <p class="history__delete" onclick="deleteEvent(${
            transaction.id
          })">X</p>
          <p>${transaction.name}</p>
          <p>${formatMoney(transaction.amount)}</p>
        </div>
      `;
    } else {
      output += `
        <div class="history__event history__event--pos">
          <p class="history__delete" onclick="deleteEvent(${
            transaction.id
          })">X</p>
          <p>${transaction.name}</p>
          <p>+${formatMoney(transaction.amount)}</p>
        </div>
      `;
    }
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));
  history.innerHTML = output;
  calculateTotals();
}

function calculateTotals() {
  let amounts = transactions.map((transaction) => transaction.amount);
  if (amounts.length > 0) {
    let balance = amounts.reduce((total, amount) => {
      return (total += amount);
    });
    balanceEl.innerHTML = formatMoney(balance);
  } else {
    balanceEl.innerHTML = formatMoney(0);
  }

  let income = amounts.filter((amount) => amount >= 0);
  if (income.length > 0) {
    income = income.reduce((total, amount) => {
      return (total += amount);
    });
    incomeEl.innerHTML = formatMoney(income);
  } else {
    incomeEl.innerHTML = formatMoney(0);
  }

  let expense = amounts.filter((amount) => amount < 0);
  if (expense.length > 0) {
    expense = expense.reduce((total, amount) => {
      return (total += amount);
    });
    expenseEl.innerHTML = formatMoney(expense * -1);
  } else {
    expenseEl.innerHTML = formatMoney(0);
  }
}

function formatMoney(figure) {
  const moneyFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  return moneyFormatter.format(figure);
}

function deleteEvent(eventId) {
  transactions.splice(transactions.indexOf(eventId), 1);
  populateHistory();
  calculateTotals();
}

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  validateForm();
});
