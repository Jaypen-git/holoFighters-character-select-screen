// Store fighter displays and it's components in an array for ease of access
let body = document.querySelector('body');
let display1 = [document.querySelector('#player1'), document.querySelector('#fighter1'), document.querySelector('#select1')];
let display2 = [document.querySelector('#player2'), document.querySelector('#fighter2'), document.querySelector('#select2')];
let selectScreen = document.querySelector('#selectScreen');
let timer = document.querySelector('.timer');
let time = 60;
let bgm = document.querySelector('#bgm');
bgm.loop = true;
let currentPlayer = 1;

let fighters = [{name: 'Tokino Sora', portrait: 'images/fighters/portraits/Tokino-Sora-Portrait.png', full: 'images/fighters/fullBody/Tokino-Sora-Full.png'}, 
{name: 'Usada Pekora', portrait: 'images/fighters/portraits/Usada-Pekora-Portrait.png', full: 'images/fighters/fullBody/Usada-Pekora-Full.png'},
{name: 'Shishiro Botan', portrait: 'images/fighters/portraits/Shishiro-Botan-Portrait.png', full: 'images/fighters/fullBody/Shishiro-Botan-Full.png'},
{name: 'Houshou Marine', portrait: 'images/fighters/portraits/Houshou-Marine-Portrait.png', full: 'images/fighters/fullBody/Houshou-Marine-Full.png'},
{name: 'Inugami Korone', portrait: 'images/fighters/portraits/Inugami-Korone-Portrait.png', full: 'images/fighters/fullBody/Inugami-Korone-Full.png'},
{name: 'Shirakami Fubuki', portrait: 'images/fighters/portraits/Shirakami-Fubuki-Portrait.png', full: 'images/fighters/fullBody/Shirakami-Fubuki-Full.png'},
{name: 'Kiryu Coco', portrait: 'images/fighters/portraits/Kiryu-Coco-Portrait.png', full: 'images/fighters/fullBody/Kiryu-Coco-Full.png'},
{name: 'Hoshimachi Suisei', portrait: 'images/fighters/portraits/Hoshimachi-Suisei-Portrait.png', full: 'images/fighters/fullBody/Hoshimachi-Suisei-Full.png'}
];

const random = () => {
    return Math.floor(Math.random()*fighters.length);
}
const selectTimer = () => {
    function countDown(){
        time--;
        if (time < 0){
            clearInterval(clock);
            selectFighter(fighters[random()], random());
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
    fighterName.innerText = '';
}
const populateDisplay = (player, fighter, fighterName) => {
    player.setAttribute('src', fighter.full);
    player.setAttribute('class', 'upperFighter')
    player.setAttribute('alt', fighter.name);
    fighterName.style.display = 'block';
    fighterName.innerText = fighter.name;
}
const Unselect = () => {
    let icons = document.querySelectorAll('img');
    for (let i = 0; i < icons.length; i++){
        icons[i].classList.remove('player2selected');
        icons[i].classList.remove('player1selected');
    }
    // clear both displays
    clearDisplay(display1[2], display1[1]);
    clearDisplay(display2[2], display2[1]);
}
const overlayInput = (event) =>{
    if (event.key === 'Enter'){
        alert('End of Demonstration!');
        location.reload();
    } else if (event.key === 'Backspace'){
        time = 60;
        document.querySelector('.overlay').remove();
        Unselect();
        selectTimer();
        window.removeEventListener('keyup', overlayInput);
        body.style.pointerEvents = 'auto';
        currentPlayer = 1;
    }
    // an alert for an input that isn't any of the above is unneccesarry    
}
const randomFighter = () => {
    let img = document.createElement('img');
    img.setAttribute('src', 'images/fighters/portraits/Random.png');
    img.classList.add('fighterIcon');
    img.classList.add('randomButton');
    img.addEventListener('click', function(){
        let pick = random();
        selectFighter(fighters[pick], pick);
        // instead of trying to get record of the dom element, just use "this"
        if (this.classList.contains('player1selected')){ // check if this icon has this class
            this.classList.remove('player1selected');
        } else if (this.classList.contains('player2selected')){
            this.classList.remove('player2selected');
        }
    });
    img.addEventListener('mouseover', function(){
        if (currentPlayer === 1){
            img.classList.add('player1selected');
            display1[1].innerText = 'Random';
            display1[2].src = '';
        } else if (currentPlayer === 2) {
            img.classList.add('player2selected');
            display2[1].innerText = 'Random';
            display2[2].src = '';
        }
    });
    img.addEventListener('mouseout', function(){
        if (currentPlayer === 1){
            img.classList.remove('player1selected');
        } else if (currentPlayer === 2){
            img.classList.remove('player2selected')
        }
    });
    selectScreen.appendChild(img);
}
const previewFighter = (item) => {
    if (currentPlayer === 1){
        let fighterImg = display1[2];
        fighterImg.classList.add('preview');
        fighterImg.setAttribute('src', item.full);
        display1[1].innerText = item.name;
    } else if (currentPlayer === 2){
        let fighterImg = display2[2];
        fighterImg.classList.add('preview');
        fighterImg.setAttribute('src', item.full);
        display2[1].innerText = item.name;
    }

}
const selectFighter = (elem, iconNumber) => {
    let playerIcon = document.getElementById(iconNumber);
    if (currentPlayer === 1){
        playerIcon.classList.add('player1selected');
        populateDisplay(display1[2], elem, display1[1]); // you can't pass a parameter to another function
        currentPlayer = 2;
    } else if (currentPlayer === 2){
        playerIcon.classList.add('player2selected');
        populateDisplay(display2[2], elem, display2[1]);
        currentPlayer = null; // this prevents the script from removing the player2selected class unexpectedly
        clearInterval(clock);
        readyPrompt();
    }
}
const displayScreen = () => {
    bgm.play();
    bgm.volume = 0.5;
    document.querySelector('.getStarted').remove();
    for (let i = 0; i < fighters.length; i++){
        let img = document.createElement('img');
        img.setAttribute('src', fighters[i].portrait);
        img.setAttribute('class', 'fighterIcon');
        img.setAttribute('id', i);
        img.addEventListener('click', function(){
            selectFighter(fighters[this.id], this.id);
        });
        img.addEventListener('mouseover', function(){
            if (currentPlayer === 1){
                img.classList.add('player1selected');
            } else if (currentPlayer === 2) {
                img.classList.add('player2selected');
            }
            previewFighter(fighters[this.id]);
        });
        img.addEventListener('mouseout', function(){
            if (currentPlayer === 1){
                img.classList.remove('player1selected');
            } else if (currentPlayer === 2){
                img.classList.remove('player2selected')
            }
        });
        selectScreen.appendChild(img);
    }
    
    randomFighter();
    selectTimer();
}
const readyPrompt = () => {
    let overlay = document.createElement('div');
    let ready = document.createElement('h1');
    window.addEventListener('keyup', overlayInput);
    ready.innerHTML = 'Are You Ready?<span class="readyInput"><span>No (Backspace)</span><span>Yes (Enter)</span></span>';
    overlay.append(ready);
    overlay.setAttribute('class', 'overlay');
    body.appendChild(overlay);
    body.style.pointerEvents = 'none';
}
// this forces the user to interact with the DOM so the bgm can play without error
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