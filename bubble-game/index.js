let timer = 60;
let score = 0;
let hitrn = 0;
let gameStarted = false;

function increaseScore() {
    score += 10;
    document.querySelector("#scoreval").textContent = score;
}

function makeBubble() {
    var clutter = "";

    for (let i = 0; i < 75; i++) {
        let randomNum = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${randomNum}</div>`;
    }

    document.querySelector("#pbtm").innerHTML = clutter;
}

function runTimer() {
    var timerInt = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.getElementById("timer").textContent = timer;
        }
        else {
            gameStarted = false;
            document.querySelector("#pbtm").innerHTML = `<h1>Game Over</h1>`
            clearInterval(timerInt);
        }
    }, 1000);
}

function getHitval() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hitval").textContent = hitrn;
}

document.querySelector("#startbtn").addEventListener("click", () => {
    gameStarted = true;
    score = 0;
    timer = 60;
    document.querySelector("#scoreval").textContent = score;
    makeBubble();
    runTimer();
    getHitval();
})

document.querySelector("#pbtm").addEventListener("click", (details) => {
    let clickedNum = Number(details.target.textContent);
    if (clickedNum === hitrn && gameStarted) {
        increaseScore();
        makeBubble();
        getHitval();
    }
})

makeBubble();