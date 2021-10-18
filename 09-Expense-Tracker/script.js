const balanceEl = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const history = document.getElementById("history");
const deleteButtons = document.getElementsByClassName("history__delete");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const error = document.getElementById("error");
const addButton = document.getElementById("button");

function validateForm() {
  if (!nameInput.value || !amountInput.value) {
    error.style.visibility = "visible";
  } else {
    error.style.visibility = "hidden";
    addNewTransaction();
  }
}

function addNewTransaction() {
  let eventHTML = "";
  if (amountInput.value < 0) {
    eventHTML += `
        <div class="history__event">
            <button class="history__delete">X</button>
            <p class="event__name">${nameInput.value}</p>
            <p class="event__amount">${amountInput.value}</p>
        </div>
      `;
  } else {
    eventHTML += `
    <div class="history__event history__event--pos">
        <button class="history__delete">X</button>
        <p class="event__name">${nameInput.value}</p>
        <p class="event__amount">+${amountInput.value}</p>
    </div>
  `;
  }

  history.innerHTML += eventHTML;
  calculateBalance();
}

function calculateBalance() {
  let balance = balanceEl.innerHTML.toString().split("");
  balance.splice(0, 1);
  let balanceNum = parseFloat(balance.join(""));
  let newBalance = balanceNum + parseFloat(amountInput.value);
  balanceEl.innerHTML = formatMoney(newBalance);
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
