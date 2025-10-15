const POS_CNT = 10;
const SCORE_INC = 10;
const TIME_LIMIT = 30000;
const GAME_WINDOW = document.querySelector("#game-window");
const TIMER = document.querySelector("#timer");
const SCORE = document.querySelector("#score");
const START_GAME = document.querySelector("#start-game");
const PELO_TIME_BASE = 250;
const PELO_TIME_ADD = 500;
const PELOS_DIV = document.querySelector("#pelos");
const UNIT = "%";
const possible_pos = [
    {x:10, y:50},
    {x:19, y:51},
    {x:26, y:53},
    {x:32, y:52},
    {x:40, y:48},

    {x:60, y:50},
    {x:69, y:51},
    {x:76, y:52},
    {x:83, y:53},
    {x:88, y:49},
];

var available = [];
var current_time = 0;
var current_score = 0;
var next_pelo_time = PELO_TIME_BASE;

function spawnPelo() {
    let cnt = 0;
    for (let i = 0; i < POS_CNT; i++) {
        if (available[i]) cnt++;
    }

    if (cnt == 0) return false;

    let goal_idx = Math.floor(Math.random()*cnt);
    let im_idx = 0, r_idx = 0;

    while (im_idx <= goal_idx) {
        if (available[r_idx]) im_idx++;
        r_idx++;
    }
    r_idx--;

    available[r_idx] = false;

    let x = possible_pos[r_idx].x;
    let y = possible_pos[r_idx].y;

    let pelo = document.querySelector(".pelo").cloneNode(true);
    pelo.setAttribute("style",
    "left:"+x+UNIT+";bottom:"+y+UNIT+";transform:rotate("+180*Math.random()+"deg)");
    pelo.classList.remove("hidden");
    pelo.setAttribute("id", r_idx);
    pelo.onmousedown = () => {
        let idx = pelo.getAttribute("id");
        available[idx] = true;
        pelo.parentNode.removeChild(pelo);
        current_score += SCORE_INC;
        SCORE.innerHTML = "Pontuação: " + current_score;
    }
    PELOS_DIV.append(pelo);
}

function setup() {
    for (let i = 0; i < POS_CNT; i++) {
        available[i] = true;
    }
    let pelos = document.querySelectorAll(".pelo");
    for (let pelo of pelos) {
        if (pelo.getAttribute("id") != null) {
            pelo.parentNode.removeChild(pelo);
        }
    }
    current_score = 0;
    current_time = 0;
    next_pelo_time = PELO_TIME_BASE;
    TIMER.innerHTML = "Tempo Restante: 30s";
    SCORE.innerHTML = "Pontuação: 0";
    PELOS_DIV.classList.remove("hidden");
}

function routine() {
    current_time += 25;
    if (current_time >= TIME_LIMIT) {
        TIMER.innerHTML = "O tempo acabou!";
        START_GAME.classList.remove("hidden");
        PELOS_DIV.classList.add("hidden");
    } else {
        if (current_time >= next_pelo_time) {
            spawnPelo();
            next_pelo_time += Math.floor(PELO_TIME_BASE+Math.random()*PELO_TIME_ADD);
        }
        TIMER.innerHTML = "Tempo Restante: " + Math.round((TIME_LIMIT-current_time)/1000) + "s";
        setTimeout(routine, 25);
    }
}

function startGame() {
    setup();
    setTimeout(routine, 25);
    spawnPelo();
    spawnPelo();
    spawnPelo();
}

START_GAME.onclick = () => {
    START_GAME.classList.add("hidden");
    startGame();
};