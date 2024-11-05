const state = {

    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },

    values: {

        gameVelocity: 1000,
        hitPosition: 0,
        result:0,
        currentTime:60,
    },

    
    actions: {

        timerId: setInterval (randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },

};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0){
        playSound("alarm01.wav")
        alert("Tempo esgotado! Seu desempenho foi: " + state.values.result);
        clearInterval(state.actions.countDownTimerId);
        clearInterval(actions.timerId);

    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}`);
    audio.volume = 0.5;
    audio.play();
}

function randomSquare() {

    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit.m4a");
            }
        });
    });
    
}

function initialize() {
    addListenerHitBox();
}

initialize();