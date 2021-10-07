// Store fighter displays and it's components in an array for ease of access
let body = document.querySelector('body');
let display1 = [document.querySelector('#player1'), document.querySelector('#fighter1'), document.querySelector('#select1')];
let display2 = [document.querySelector('#player2'), document.querySelector('#fighter2'), document.querySelector('#select2')];
let selectScreen = document.querySelector('#selectScreen');
let timer = document.querySelector('.timer');
let time = 60;
let bgm = document.querySelector('#bgm');
bgm.loop = true;

let fighters = ['Tokino Sora', 'Usada Pekora', 'Shishiro Botan'];

const random = () => {
    return Math.floor(Math.random()*fighters.length);
}
const selectTimer = () => {
    function countDown(){
        time--;
        if (time < 0){
            clearInterval(clock);
            selectFighter(fighters[random()], random());
        } else {
            timer.innerText = time;
        }
    }
    return clock = setInterval(countDown, 1000);
}
// efficiently clear a fighter display and choose which one you want do delete
const clearDisplay = (img, fighterName) => {
    img.removeAttribute('src');
    img.removeAttribute('alt');
    fighterName.style.display = 'none';
}
const populateDisplay = (player, fighter, fighterName) => {
    player.setAttribute('src', `fighters/upperBody/${fighter} Upper.png`);
    player.setAttribute('class', 'upperFighter')
    player.setAttribute('alt', fighter);
    fighterName.style.display = 'block';
    fighterName.innerText = fighter;
}
const Unselect = () => {
    let icons = document.querySelectorAll('img');
    for (let i = 0; i < icons.length; i++){
        icons[i].classList.remove('cpuSelected');
        icons[i].classList.remove('selected');
    }
    // clear both displays
    clearDisplay(display1[2], display1[1]);
    clearDisplay(display2[2], display2[1]);
}
const createYesButton = () => {
    let yesButton = document.createElement('button');
    yesButton.setAttribute('id', 'start');
    yesButton.innerText = 'Start';
    yesButton.addEventListener('click', function(){
        alert('End of Demonstration!');
        location.reload();
    });
    return yesButton;
}
const createNoButton = (elem) => {
    let noButton = document.createElement('button');
    noButton.setAttribute('id', 'goBack')
    noButton.innerText = 'Go back';
    noButton.addEventListener('click', function(){
        time = 60;
        elem.remove();
        Unselect();
        selectTimer();
    });
    return noButton;
}
const selectFighter = (elem, iconNumber) => {
    Unselect();
    let playerIcon = document.getElementById(iconNumber);
    playerIcon.classList.add('selected');
    populateDisplay(display1[2], elem, display1[1]); // you can't pass a parameter to another function
    let value = random();
    let cpu = fighters[value];
    let cpuIcon = document.getElementById(value);
    cpuIcon.classList.add('cpuSelected');
    populateDisplay(display2[2], cpu, display2[1]);
    clearInterval(clock);
    setTimeout(readyPrompt, 300);
}
const displayScreen = () => {
    bgm.play();
    document.querySelector('.getStarted').remove();
    for (let i = 0; i < fighters.length; i++){
        let img = document.createElement('img');
        img.setAttribute('src', `fighters/portraits/${fighters[i]} Portrait.png`);
        img.setAttribute('class', 'fighterIcon')
        img.setAttribute('id', i);
        img.addEventListener('click', function(){
            selectFighter(fighters[this.id], this.id);
        });
        selectScreen.appendChild(img);
    }
    selectTimer();
}
const readyPrompt = () => {
    let overlay = document.createElement('div');
    let ready = document.createElement('h1');
    createYesButton();
    createNoButton();
    ready.innerText = 'Are You Ready?';
    overlay.append(ready, createYesButton(), createNoButton(overlay));
    overlay.setAttribute('class', 'overlay');
    body.appendChild(overlay);
}
const getStarted = () => {
    let begin = document.createElement('div');
    begin.setAttribute('class', 'getStarted');
    let message = document.createElement('h1');
    message.innerText = 'Click here to get started!'
    message.addEventListener('click', displayScreen);
    begin.appendChild(message);
    body.appendChild(begin);
}
getStarted();
