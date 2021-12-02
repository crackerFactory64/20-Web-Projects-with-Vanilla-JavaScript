const msgEl = document.getElementById("msg");

const number = Math.floor(Math.random() * 100) + 1;
console.log(number);
const listener = new webkitSpeechRecognition() || new speechRecognition();
listener.continuous = true;
let result = "";
let guesses = 0;

listener.start();
listener.addEventListener("result", (e) => {
  guesses++;
  //assigns result the latest audio input
  result = +e.results[e.results.length - 1][0].transcript;
  console.log(result);
  handleResult(result);
});

function handleResult(result) {
  let output = "";
  if (Number.isNaN(result) || result <= 0 || result > 100) {
    output = "<p>Please say a number between 1-100.</p>";
    //if the input is not a valid guess delete 1 from guess count
    guesses--;
  } else if (result < number) {
    output = `
        <p>You guessed ${result}, that was incorrect.</p>
        <span class="advice">Go higher</span>        
    `;
  } else if (result > number) {
    output = `
        <p>You guessed ${result}, that was incorrect.</p>
        <span class="advice">Go lower</span>        
    `;
  } else if (result === number) {
    output = `
        <h2>Well Done!</h2>
        <p>You correctly guessed that the number was ${number} in ${guesses} ${tryOrTries()}.</p>
        <button class="app__btn" onclick="reset()">Play Again</button>    
      `;
  }
  msgEl.innerHTML = output;
  msgEl.style.visibility = "visible";
}

function reset() {
  window.location.reload();
}

function tryOrTries() {
  return guesses == 1 ? "try" : "tries";
}
