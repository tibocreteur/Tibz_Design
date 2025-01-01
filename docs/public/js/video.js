// Sélection des éléments HTML
const video = document.getElementById('video');
const playPauseButton = document.getElementById('play-pause');
const progressBar = document.getElementById('progress');
const timeDisplay = document.getElementById('time');
const muteButton = document.getElementById('mute');
const volumeSlider = document.getElementById('volume');
const fullscreenButton = document.getElementById('fullscreen');

// Lecture / Pause
playPauseButton.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPauseButton.textContent = '⏸️'; // Change l'icône
  } else {
    video.pause();
    playPauseButton.textContent = '▶️';
  }
});

// Mise à jour de la barre de progression et du temps
video.addEventListener('timeupdate', () => {
  const currentTime = video.currentTime;
  const duration = video.duration;

  // Mise à jour de la barre de progression
  progressBar.value = (currentTime / duration) * 100;

  // Affichage du temps formaté
  timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
});

// Changer la position de lecture via la barre de progression
progressBar.addEventListener('input', () => {
  video.currentTime = (progressBar.value / 100) * video.duration;
});

// Couper / Activer le son
muteButton.addEventListener('click', () => {
  video.muted = !video.muted;
  muteButton.textContent = video.muted ? '🔊' : '🔇';
});

// Contrôle du volume
volumeSlider.addEventListener('input', () => {
  video.volume = volumeSlider.value;
});

// Plein écran
fullscreenButton.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    video.requestFullscreen();
  }
});

// Formatage du temps en minutes et secondes
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
