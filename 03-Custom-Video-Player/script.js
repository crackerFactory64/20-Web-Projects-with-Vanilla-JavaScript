const video = document.getElementById("video");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");
const progressBar = document.getElementById("progress");

const resetVideo = () => {
  video.pause();
  video.currentTime = 0;
  pauseButton.classList.add("hidden");
  playButton.classList.remove("hidden");
};

playButton.onclick = () => {
  video.play();
  playButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");
};

pauseButton.onclick = () => {
  video.pause();
  pauseButton.classList.add("hidden");
  playButton.classList.remove("hidden");
};

video.ontimeupdate = () => {
  if (Math.round(video.currentTime) < 10) {
    document.getElementById("time").innerHTML =
      "0:0" + Math.round(video.currentTime);
  } else {
    document.getElementById("time").innerHTML =
      "0:" + Math.round(video.currentTime);
  }
  progressBar.value = video.currentTime / 0.1972;
};

progressBar.oninput = () => {
  video.currentTime = progressBar.value * 0.1972;
};

stopButton.addEventListener("click", resetVideo);
video.addEventListener("ended", resetVideo);
