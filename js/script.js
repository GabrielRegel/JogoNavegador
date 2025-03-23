const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const restartButton = document.getElementById('restart-button');
const scoreElement = document.getElementById('score');
const bestScoreElement = document.getElementById('best-score');
const gameBoard = document.querySelector('.game-board');
const nightOverlay = document.querySelector('.night-overlay');

let score = 0;
let bestScore = localStorage.getItem('bestScore') || 0;
bestScoreElement.textContent = `Best Score: ${bestScore}`;

const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        clouds.style.animationPlayState = 'paused';
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;
        mario.src = '../images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        clearInterval(loop);
        clearInterval(scoreInterval);
        restartButton.style.display = 'block';

        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem('bestScore', bestScore);
            bestScoreElement.textContent = `Best Score: ${bestScore}`;
        }
    }
}, 10);

const scoreInterval = setInterval(() => {
    score++;
    scoreElement.textContent = `Score ${score}`;

    // Cálculo do ciclo: a cada 1000 pontos um ciclo completo de dia -> noite -> dia
    const cycle = (score % 1000) / 1000; // valor entre 0 e 1
    // Usando uma função seno para uma transição suave:
    const alpha = 0.5 * (1 - Math.cos(2 * Math.PI * cycle));
    nightOverlay.style.opacity = alpha;
}, 100);

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

document.addEventListener('keydown', () => {
    if (restartButton.style.display === 'block') {
        location.reload();
    }
});

restartButton.addEventListener('click', () => {
    location.reload();
});