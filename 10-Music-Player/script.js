const albumArt = document.getElementById("album-art");
const skipBack = document.getElementById("skip-b");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const skipFoward = document.getElementById("skip-f");

function spin() {
  const animation = [{ transform: "rotate(360deg)" }];
  const duration = { duration: 1800, iterations: Infinity };

  albumArt.animate(animation, duration);
}

play.addEventListener("click", () => {
  spin();
});
