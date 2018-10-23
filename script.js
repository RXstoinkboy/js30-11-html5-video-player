// get elements
const player = document.querySelector('.player');
const video = player.querySelector('.video');
const progressBar = player.querySelector('.progress-bar');
const progressField = player.querySelector('.progress-field');
const playButton = player.querySelector('.play-button');
const sliders = player.querySelectorAll('input');
const skipButtons = player.querySelectorAll('[data-skip]');

// build functions



function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
}

function updateButton() {
    const icon = this.paused ? '▶' : '▮▮';
    playButton.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function updateProperty() {
    video[this.name] = this.value;
}

function updateTime() {
    const percentage = (video.currentTime / video.duration) * 100;
    progressField.style.flexBasis = `${percentage}%`;
}

function scrub(e) {
    console.log(e);
    const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// make event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', updateTime);

playButton.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

sliders.forEach(slider => slider.addEventListener('change', updateProperty));

let mousedown = false;
progressField.addEventListener('click', scrub);
progressBar.addEventListener('click', scrub);
progressField.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressField.addEventListener('mousedown', () => mousedown = true);
progressField.addEventListener('mouseup', () => mousedown = false);
progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBar.addEventListener('mousedown', () => mousedown = true);
progressBar.addEventListener('mouseup', () => mousedown = false);

// TODO add fullscreen mode