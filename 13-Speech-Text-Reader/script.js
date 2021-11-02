const customise = document.getElementById("toggle");
const close = document.getElementById("close");
const voiceSelect = document.getElementById("voice");
const customText = document.getElementById("custom");
const read = document.getElementById("read");
const openCustom = document.getElementById("custom-button");
const cards = document.getElementById("cards");
let cardsArr = [];

const info = [
    { text: "I am thirsty", img: "images/drink.jpg" },
    { text: "I am hungry", img: "images/food.jpg" },
    { text: "I am tired", img: "images/tired.jpg" },
    { text: "I am happy", img: "images/happy.jpg" },
    { text: "I am hurt", img: "images/hurt.jpg" },
    { text: "I am scared", img: "images/scared.jpg" },
    { text: "I want to go home", img: "images/home.jpg" },
    { text: "I want to go outside", img: "images/outside.jpg" },
    { text: "I want to go to school", img: "images/school.jpg" },
    { text: "I want Grandma", img: "images/grandma.jpg" },
];


const synth = window.speechSynthesis;

let voices = [];
let words = new SpeechSynthesisUtterance();
let selectedVoice = "";

generateCards();
setTimeout(() => { populateVoices(); }, 500)

function generateCards() {
    let output = "";
    info.forEach((set) => {
        output += `
            <div class="card" onclick="speak('${set.text}'), highlightCard(this)">
                <div class="card__img-container">
                    <img 
                        src="${set.img}"
                        alt="${set.text}"
                        class="card__img"
                    />
                </div>
                <h2 class="card__title">"${set.text}"</h2>
            </div>
        `;
    });
    cards.innerHTML = output;
    cardsArr = document.querySelectorAll(".card");
}

function speak(words) {
    if (!synth.speaking) {
        words = new SpeechSynthesisUtterance(words);
        words.onend = () => {
            removeHighlights();
        }
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                words.voice = voice;
            }
        })
        synth.speak(words);
    }
}

function populateVoices() {
    voices = synth.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name;
        voiceSelect.appendChild(option);
    })
}

function highlightCard(card) {
    for (let i = 0; i < cardsArr.length; i++) {
        if (cardsArr[i].classList.contains("card--selected")) {
            return
        }
    }
    card.classList.add("card--selected");
}

function removeHighlights() {
    cardsArr.forEach((card) => {
        card.classList.remove("card--selected");
    })
}


function showHide() {
    customise.classList.toggle("toggle--open");
}

openCustom.addEventListener("click", () => {
    showHide();
});

close.addEventListener("click", () => {
    showHide();
});

read.addEventListener("click", () => {
    speak(customText.value);
})

voiceSelect.addEventListener("change", () => {
    selectedVoice = voiceSelect.value;
})

