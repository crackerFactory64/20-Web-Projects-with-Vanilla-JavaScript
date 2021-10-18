const balance = document.getElementById("balance");
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
  }
}

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  validateForm();
});
