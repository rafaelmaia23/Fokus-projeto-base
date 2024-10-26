const html = document.querySelector("html");
const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const btns = document.querySelectorAll(".app__card-button");
const playBtn = document.querySelector(".app__card-primary-button");
const playBtnText = document.querySelector("#start-pause span");
const playBtnIcon = document.querySelector(".app__card-primary-butto-icon");
const timerDisplay = document.querySelector(".app__card-timer");
const img = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const musicFocoInput = document.querySelector("#alternar-musica");

const timerBtnStates = {
    comecar: {
        text: "Começar",
        imgSrc: "./imagens/play_arrow.png",
    },
    pausar: {
        text: "Pausar",
        imgSrc: "./imagens/pause.png",
    },
    recomecar: {
        text: "Voltar",
        imgSrc: "./imagens/play_arrow.png",
    },
};

const timeFoco = 1500;
const timeCurto = 300;
const timeLongo = 900;
const playAudio = new Audio("./sons/play.wav");
const pauseAudio = new Audio("./sons/pause.mp3");
const beepAudio = new Audio("./sons/beep.mp3");
const music = new Audio("./sons/luna-rise-part-one.mp3");
music.loop = true;

let timer;
let timeRemainig;
let isRunning = false;

setCountdownValue(timeFoco);
let state = "pausar";
console.log(timerBtnStates[`${state}`].imgSrc);

function alterarContexto(contexto) {
    for (const btn of btns) {
        btn.classList.remove("active");
    }
    html.setAttribute("data-contexto", contexto);
    img.setAttribute("src", `./imagens/${contexto}.png`);
    const titleTexts = {
        foco: `Otimize sua produtividade,<br /><strong class="app__title-strong">mergulhe no que importa.</strong>`,
        "descanso-curto": `Que tal dar uma respirada?<br /><strong class="app__title-strong">Faça uma pausa curta!</strong>`,
        "descanso-longo": `Hora de voltar à superfície.<br /><strong class="app__title-strong">Faça uma pausa longa.</strong>`,
    };
    title.innerHTML = titleTexts[contexto];
}

function countdown(duration) {
    if (isRunning) {
        clearInterval(timer);
        setTimerBtnTo("recomecar");
        pauseAudio.play();
    } else {
        playAudio.play();
        setTimerBtnTo("pausar");
        timer = setInterval(() => {
            if (timeRemainig > 0) {
                setTimerDisplay();
                timeRemainig--;
            } else {
                clearInterval(timer);
                isRunning = false;
                timeRemainig = undefined;
                setTimerBtnTo("comecar");
                beepAudio.play();
            }
        }, 1000);
    }
    isRunning = !isRunning;
}

function setTimerDisplay() {
    const time = new Date(timeRemainig * 1000);
    const formatedTime = time.toLocaleTimeString("pt-Br", {
        minute: "2-digit",
        second: "2-digit",
    });
    timerDisplay.innerHTML = `${formatedTime}`;
}

function setCountdownValue(time) {
    timeRemainig = time;
    setTimerDisplay();
}

function setTimerBtnTo(state) {
    playBtnIcon.setAttribute("src", timerBtnStates[state].imgSrc);
    playBtnText.textContent = timerBtnStates[state].text;
}

focoBtn.addEventListener("click", () => {
    alterarContexto("foco");
    focoBtn.classList.add("active");
    setCountdownValue(timeFoco);
    setTimerBtnTo("comecar");
});

curtoBtn.addEventListener("click", () => {
    alterarContexto("descanso-curto");
    curtoBtn.classList.add("active");
    setCountdownValue(timeCurto);
    setTimerBtnTo("comecar");
});

longoBtn.addEventListener("click", () => {
    alterarContexto("descanso-longo");
    longoBtn.classList.add("active");
    setCountdownValue(timeLongo);
    setTimerBtnTo("comecar");
});

playBtn.addEventListener("click", () => {
    countdown(5);
});

musicFocoInput.addEventListener("change", () => {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
});
