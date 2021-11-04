const newCard = document.getElementById("new-card");
const closeNewCard = document.getElementById("close");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addNewBtn = document.getElementById("add-new");
const openNewCard = document.getElementById("open-add");
const cards = document.getElementById("cards");
const prevCard = document.getElementById("prev");
const currentCard = document.getElementById("number");
const nextCard = document.getElementById("next");
const clearCards = document.getElementById("clear");

let cardsArr = [{ q: "What is the capital of England?", a: "London" }, { q: "What is the capital of France?", a: "Paris" }]

let cardsElArr = [];
let currentCardIndex = 0;

populateCardsEl();

function populateCardsEl() {
    let output = "";
    cardsArr.forEach(card => {
        output +=
            `
            <div class="card">
                <button class="card__button button">
                    <i class="fas fa-undo"></i>Flip
                </button>
                <div class="card__front card__show">
                    <p class="card__body">${card.q}</p>
                </div>
                <div class="card__back">
                    <p class="card__body">${card.a}</p>
                </div>
            </div>
        `

    })
    cards.innerHTML = output;
    cardsElArr = document.querySelectorAll(".card");
    updateDOM();
}

function changeCard(direction) {
    direction == next ? currentCardIndex++ : currentCardIndex--;

    if (currentCardIndex + 1 > cardsElArr.length) {
        currentCardIndex = 0;
    }

    if (currentCardIndex < 0) {
        cardsElArr.length > 0 ? currentCardIndex = cardsElArr.length - 1 : currentCardIndex = 0;
    }

    cardsElArr.forEach(card => {
        card.classList.remove("card--active");
    })

    updateDOM();
}

function addNewCard() {
    const question = questionEl.value;
    const answer = answerEl.value;

    cardsArr.push({ "q": question, "a": answer });

    populateCardsEl();
}

function openCloseAdd() {
    newCard.classList.toggle("new-card--show");
}

function updateDOM() {
    if (cardsElArr.length > 0) {
        cardsElArr[currentCardIndex].classList.add("card--active");
        currentCard.innerHTML = `${currentCardIndex + 1}/${cardsArr.length}`;
    } else {
        currentCard.innerHTML = `${currentCardIndex}/${cardsArr.length}`;
    }
}

openNewCard.addEventListener("click", () => {
    openCloseAdd();
})

addNewBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addNewCard();
    openCloseAdd();
})

closeNewCard.addEventListener("click", () => {
    openCloseAdd();
})

nextCard.addEventListener("click", () => {
    changeCard(next);
})

prevCard.addEventListener("click", () => {
    changeCard(prev);
})

clearCards.addEventListener("click", () => {
    cardsArr = [];
    populateCardsEl();
})