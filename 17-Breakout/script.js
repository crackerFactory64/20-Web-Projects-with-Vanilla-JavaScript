const rulesPanel = document.getElementById("rules-panel");
const closeRulesBtn = document.getElementById("close-rules");
const openRulesBtn = document.getElementById("rules-button");

openRulesBtn.addEventListener("click", () => {
  rulesPanel.classList.toggle("rules--open");
});

closeRulesBtn.addEventListener("click", () => {
  rulesPanel.classList.toggle("rules--open");
});
