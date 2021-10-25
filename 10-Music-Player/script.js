const albumArt = document.getElementById("album-art");
const skipBack = document.getElementById("skip-b");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const skipFoward = document.getElementById("skip-f");
const audio = document.getElementById("audio");
const songInfo = document.getElementById("song-info");
const titleEl = document.getElementById("title");
const progressBar = document.getElementById("progress-container");
const progressEl = document.getElementById("progress");

const songs = [
  { title: "Ukulele", art: "images/ukulele.jpg", audio: "music/ukulele.mp3" },
  { title: "Hey", art: "images/hey.jpg", audio: "music/hey.mp3" },
  { title: "Summer", art: "images/summer.jpg", audio: "music/summer.mp3" },
];
let currentSong = 0;

loadSong();

function loadSong() {
  audio.src = songs[currentSong].audio;
  titleEl.innerHTML = songs[currentSong].title;
  albumArt.innerHTML = ` 
    <img src=${songs[currentSong].art} alt="${songs[currentSong].title}" class="controls__img" />
      <div class="controls__disc-center"></div>
    </div>`;
}

function playSong() {
  audio.play();
  songInfo.classList.remove("player__song-info--hide");
  play.classList.add("controls__control--hide");
  pause.classList.remove("controls__control--hide");
  albumArt.classList.add("controls__img-container--playing");
}

function skipSong(direction) {
  direction == "forwards" ? currentSong++ : currentSong--;
  if (currentSong > songs.length - 1) {
    currentSong = 0;
  }
  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }
  loadSong();
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

audio.ontimeupdate = () => {
  progressEl.style.width = `${audio.currentTime / (audio.duration * 0.01)}%`;
};

progressBar.addEventListener("click", setProgress);

audio.onended = () => {
  skipSong("forwards");
  playSong();
};

play.addEventListener("click", () => {
  playSong();
});

pause.addEventListener("click", () => {
  audio.pause();
  songInfo.classList.add("player__song-info--hide");
  play.classList.remove("controls__control--hide");
  pause.classList.add("controls__control--hide");
  albumArt.classList.remove("controls__img-container--playing");
});

skipBack.addEventListener("click", () => {
  skipSong("backwards");
  playSong();
});

skipFoward.addEventListener("click", () => {
  skipSong("forwards");
  playSong();
});
