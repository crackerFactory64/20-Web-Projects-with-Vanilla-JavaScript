const msgEl = document.getElementById("msg");

const number = Math.floor(Math.random() * 100) + 1;
console.log(number);
const listener = new webkitSpeechRecognition();
let result = "";

listener.start();
listener.addEventListener("result", (e) => {
  result = +e.results[0][0].transcript;
  handleResult(result);
});

function handleResult(result) {
  let output = "";
  if (result === number) {
    output = `
        <h2>Well Done!</h2>
        <p>You correctly guessed that the number was ${number}.</p>
        <button class="app__btn" onclick="reset()">Play Again</button>    
      `;
  }
}
