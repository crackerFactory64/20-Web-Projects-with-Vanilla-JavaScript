const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const history = document.getElementById("history");
const deleteButtons = document.getElementsByClassName("history__delete");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const error = document.getElementById("error");
const addButton = document.getElementById("button");

let balance = 0;
let income = 0;
let expense = 0;

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
  let amount = formatMoney(amountInput.value.trim());
  let eventHTML = "";
  if (amountInput.value < 0) {
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
  calculateTotals();
}

function calculateTotals() {
  let input = parseFloat(amountInput.value.trim());

  balance = balance + input;

  if (input > 0) {
    income = income + input;
  } else {
    expense = expense + input;
  }

  updateDOM();
}

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
}

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
