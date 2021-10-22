const albumArt = document.getElementById("album-art");
const skipBack = document.getElementById("skip-b");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const skipFoward = document.getElementById("skip-f");
const audio = document.getElementById("audio");
const titleEl = document.getElementById("title");
const progressEl = document.getElementById("progress");

const ukulele = "music/ukulele.mp3";
const hey = "music/hey.mp3";
const summer = "music/summer.mp3";

const songs = [ukulele, hey, summer];

function spin() {
  const animation = [{ transform: "rotate(360deg)" }];
  const duration = { duration: 1800, iterations: Infinity };

  albumArt.animate(animation, duration);
}

play.addEventListener("click", () => {
  spin();
  audio.src = songs[0];
  titleEl.innerHTML = "Ukulele";
  audio.play();
});
