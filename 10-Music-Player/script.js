const albumArt = document.getElementById("album-art");
const skipBack = document.getElementById("skip-b");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const skipFoward = document.getElementById("skip-f");
const audio = document.getElementById("audio");
const songInfo = document.getElementById("song-info");
const titleEl = document.getElementById("title");
const progressEl = document.getElementById("progress");

const songs = [
  { title: "Ukulele", art: "images/ukulele.jpg", audio: "music/ukulele.mp3" },
  { title: "Hey", art: "images/hey.jpg", audio: "music/hey.mp3" },
  { title: "Summer", art: "images/summer.jpg", audio: "music/summer.mp3" },
];

let currentSong = 0;

let spin = "";

function playSong() {
  if (spin) {
    spin.cancel();
  }

  audio.src = songs[currentSong].audio;

  titleEl.innerHTML = songs[currentSong].title;

  songInfo.classList.remove("player__song-info--hide");

  albumArt.innerHTML = ` 
    <img src=${songs[currentSong].art} alt="${songs[currentSong].title}" class="controls__img" />
    <div class="controls__disc-center"></div>
  </div>`;

  spin = albumArt.animate([{ transform: "rotate(360deg)" }], {
    duration: 1800,
    iterations: Infinity,
  });

  audio.play();
  play.classList.add("controls__control--hide");
  pause.classList.remove("controls__control--hide");
}

function skipSong(direction) {
  direction == "forwards" ? currentSong++ : currentSong--;

  if (currentSong == 3) {
    currentSong = 0;
  }

  if (currentSong < 0) {
    currentSong = 2;
  }
}

audio.ontimeupdate = () => {
  progressEl.style.width = `${audio.currentTime / (audio.duration * 0.01)}%`;
};

play.addEventListener("click", () => {
  playSong();
});

pause.addEventListener("click", () => {
  audio.pause();
  spin.pause();
  songInfo.classList.add("player__song-info--hide");
  play.classList.remove("controls__control--hide");
  pause.classList.add("controls__control--hide");
});

skipBack.addEventListener("click", () => {
  skipSong("backwards");
  playSong();
});
skipFoward.addEventListener("click", () => {
  skipSong("forwards");
  playSong();
});
