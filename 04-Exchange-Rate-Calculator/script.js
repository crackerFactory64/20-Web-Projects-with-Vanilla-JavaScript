const currencyInput1 = document.getElementById("currency1");
const currencyInput2 = document.getElementById("currency2");
const amountInput1 = document.getElementById("amount1");
const amountInput2 = document.getElementById("amount2");

const rateP = document.getElementById("rate");
const swap = document.getElementById("swap");

const calculate = () => {
  const currency1 = currencyInput1.value;
  const currency2 = currencyInput2.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/e2b63b01d0d59384783ebdfa/latest/${currency1}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currency2];
      rateP.innerHTML = `1 ${currency1} = ${rate} ${currency2}`;
      const amount1 = amountInput1.value;
      amountInput2.value = (rate * amount1).toFixed(2);
    });
};

const swapCurrencies = () => {
  let currencyHolder = currencyInput1.value;
  currencyInput1.value = currencyInput2.value;
  currencyInput2.value = currencyHolder;
  calculate();
};

currencyInput1.addEventListener("change", calculate);
currencyInput2.addEventListener("change", calculate);

amountInput1.addEventListener("input", calculate);
amountInput2.addEventListener("input", calculate);

swap.onclick = swapCurrencies;

calculate();
