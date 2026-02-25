const playBtn = document.querySelector('.puse-play');
const muteBtn = document.querySelector('.mute-unmute');
const musicSlider = document.querySelector('.range');
const backBtn = document.querySelector('.back');
const nextBtn = document.querySelector('.next');
const artistName = document.querySelector('.artist-Name')
const artistMusic = document.querySelector('.artist-music')
const artistImage = document.querySelector('.artist-img')
const songs = [
  {
    title: "Brown Munde",
    artist: "AP Dhillon",
    file: "./music/Brown Munde.mp3",
    image: "./artist image/ap.jpg"
  },
  {
    title: "Lose Yourself",
    artist: "Eminem",
    file: "./music/Lose yourself.mp3",
    image: "./artist image/Eminem.jpg"
  },
  {
    title: "Sapphire",
    artist: "Ed Sheerann",
    file: "./music/sapphire.mp3",
    image: "./artist image/ed sheerann.jpg"
  }
];

let currentMusicIndex = 0;
let music = new Audio(songs[currentMusicIndex].file);


function loadSong(index) {
  currentMusicIndex = index;
  music.src = songs[currentMusicIndex].file;
  music.play();
  artistName.textContent = `${songs[currentMusicIndex].artist}`
  artistMusic.textContent = `${songs[currentMusicIndex].title}`
  artistImage.style.setProperty('background', `url("${songs[currentMusicIndex].image}")`);
  artistImage.style.setProperty('background-position', 'center');
 artistImage.style.setProperty('background-size', 'cover');
}


playBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
});


muteBtn.addEventListener('click', () => {
  music.muted = !music.muted;
});


music.addEventListener('loadedmetadata', () => {
  musicSlider.max = music.duration;
});


music.addEventListener('timeupdate', () => {
  musicSlider.value = music.currentTime;
});

musicSlider.addEventListener('input', (e) => {
  music.currentTime = e.target.value;
});


backBtn.addEventListener('click', () => {
  currentMusicIndex = (currentMusicIndex - 1 + songs.length) % songs.length;
  loadSong(currentMusicIndex);
});

nextBtn.addEventListener('click', () => {
  currentMusicIndex = (currentMusicIndex + 1) % songs.length;
  loadSong(currentMusicIndex);
});

music.addEventListener('ended', () => {
  currentMusicIndex = (currentMusicIndex + 1) % songs.length;
  loadSong(currentMusicIndex);
});
