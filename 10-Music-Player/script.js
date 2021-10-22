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

let spin = "";

audio.ontimeupdate = () => {
  progressEl.style.width = `${audio.currentTime / (audio.duration * 0.01)}%`;
};

play.addEventListener("click", () => {
  spin = albumArt.animate([{ transform: "rotate(360deg)" }], {
    duration: 1800,
    iterations: Infinity,
  });
  audio.src = songs[0];
  titleEl.innerHTML = "Ukulele";
  audio.play();
  play.classList.add("controls__control--hide");
  pause.classList.remove("controls__control--hide");
});

pause.addEventListener("click", () => {
  audio.pause();
  spin.cancel();
  play.classList.remove("controls__control--hide");
  pause.classList.add("controls__control--hide");
});
