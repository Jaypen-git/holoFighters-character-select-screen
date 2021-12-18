// Store fighter displays and it's components in an array for ease of access
let body = document.querySelector('body');
let display1 = [document.querySelector('#player1'), document.querySelector('#fighter1'), document.querySelector('#select1')];
let display2 = [document.querySelector('#player2'), document.querySelector('#fighter2'), document.querySelector('#select2')];
let selectScreen = document.querySelector('#selectScreen');
let timer = document.querySelector('.timer');
let time = 60;
let bgm = document.querySelector('#bgm');
bgm.loop = true; // loop the background music
let currentPlayer = 1;
// List fighters and their respective images
let fighters = [{name: 'Tokino Sora', portrait: 'images/fighters/portraits/Tokino-Sora-Portrait.png', full: 'images/fighters/fullBody/Tokino-Sora-Full.png'},
// Store fighter information in an object for ease of access
{name: 'Usada Pekora', portrait: 'images/fighters/portraits/Usada-Pekora-Portrait.png', full: 'images/fighters/fullBody/Usada-Pekora-Full.png'},
{name: 'Shishiro Botan', portrait: 'images/fighters/portraits/Shishiro-Botan-Portrait.png', full: 'images/fighters/fullBody/Shishiro-Botan-Full.png'},
{name: 'Houshou Marine', portrait: 'images/fighters/portraits/Houshou-Marine-Portrait.png', full: 'images/fighters/fullBody/Houshou-Marine-Full.png'},
{name: 'Inugami Korone', portrait: 'images/fighters/portraits/Inugami-Korone-Portrait.png', full: 'images/fighters/fullBody/Inugami-Korone-Full.png'},
{name: 'Shirakami Fubuki', portrait: 'images/fighters/portraits/Shirakami-Fubuki-Portrait.png', full: 'images/fighters/fullBody/Shirakami-Fubuki-Full.png'},
{name: 'Kiryu Coco', portrait: 'images/fighters/portraits/Kiryu-Coco-Portrait.png', full: 'images/fighters/fullBody/Kiryu-Coco-Full.png'},
{name: 'Hoshimachi Suisei', portrait: 'images/fighters/portraits/Hoshimachi-Suisei-Portrait.png', full: 'images/fighters/fullBody/Hoshimachi-Suisei-Full.png'},
{name: 'Sakura Miko', portrait: 'images/fighters/portraits/Sakura-Miko-Portrait.png', full: 'images/fighters/fullBody/Sakura-Miko-Full.png'},
{name: 'Omaru Polka', portrait: 'images/fighters/portraits/Omaru-Polka-Portrait.png', full: 'images/fighters/fullBody/Omaru-Polka-Full.png'},
{name: 'Akai Haato', portrait: 'images/fighters/portraits/Akai-Haato-Portrait.png', full: 'images/fighters/fullBody/Akai-Haato-Full.png'},
{name: 'Amane Kanata', portrait: 'images/fighters/portraits/Amane-Kanata-Portrait.png', full: 'images/fighters/fullBody/Amane-Kanata-Full.png'},
{name: 'Robocosan', portrait: 'images/fighters/portraits/Robocosan-Portrait.png', full: 'images/fighters/fullBody/Robocosan-Full.png'},
{name: 'Shirogane Noel', portrait: 'images/fighters/portraits/Shirogane-Noel-Portrait.png', full: 'images/fighters/fullBody/Shirogane-Noel-Full.png'},
{name: 'Oozora Subaru', portrait: 'images/fighters/portraits/Oozora-Subaru-Portrait.png', full: 'images/fighters/fullBody/Oozora-Subaru-Full.png'},
{name: 'Aki Rosenthal', portrait: 'images/fighters/portraits/Aki-Rosenthal-Portrait.png', full: 'images/fighters/fullBody/Aki-Rosenthal-Full.png'}
];
//Function to return a random fighter
const random = () => {
    return Math.floor(Math.random()*fighters.length); //This returns a random index in the array "fighters"
}
const selectTimer = () => {
    // create a function to decrease timer by 1 second until the timer reaches 0
    function countDown(){
        time--;
        if (time < 0){ // if the timer reaches 0
            let player1 = random(); // randomly pick fighters for the two players
            let player2 = random();
            clearInterval(clock);
            selectFighter(fighters[player1], player1);
            selectFighter(fighters[player2], player2);
        } else {
            timer.innerText = time; // if not, display how much time is left
        }
    }
    return clock = setInterval(countDown, 1000); // run the "countDown" function every 1 second
}
// efficiently clear a fighter display and choose which one you want do delete
const clearDisplay = (img, fighterName) => {
    // remove the "src" and "alt" attributes
    img.removeAttribute('src');
    img.removeAttribute('alt');
    fighterName.innerText = ''; // make the fighter name text empty
}
// write a function to set to display picked fighter's name and picture
const populateDisplay = (player, fighter, fighterName) => {
    player.setAttribute('src', fighter.full); // access fighter's full body image from object attribute
    player.setAttribute('class', 'fullPicture') // apply styles from class "fullPicture"
    player.setAttribute('alt', fighter.name); // add alternate text for image in case image doesn't work
    fighterName.style.display = 'block';
    fighterName.innerText = fighter.name; // take name attribute from fighter object and display it
}
// make a function to unselect fighters
const Unselect = () => {
    let icons = document.querySelectorAll('img'); // grab every img tag
    for (let i = 0; i < icons.length; i++){ // for each img, remove the class "player1selected" and "player2selected"
        icons[i].classList.remove('player2selected');
        icons[i].classList.remove('player1selected');
    }
    let indicators = document.querySelectorAll('.iconContainer span'); //grab every span tag in an element with the "iconContainer" class
    for (let i = 0; i < indicators.length; i++){ // for each indicator (the span tag)
        indicators[i].style.display = 'none'; // hide the indicator element
    }
    // clear both displays
    clearDisplay(display1[2], display1[1]);
    clearDisplay(display2[2], display2[1]);
}
// write function to end demonstration or continue demonstration
const overlayInput = (event) =>{
    if (event.key === 'Enter'){ // check if the user pressed enter key
        alert('End of Demonstration!');
        location.reload(); // end the demo and reload the page
    } else if (event.key === 'Backspace'){ // check if the user pressed backspace key
        time = 60; // set the timer back to 60
        document.querySelector('.overlay').remove(); // remove the overlay
        Unselect(); // unselect all characters
        selectTimer(); // run the timer
        window.removeEventListener('keyup', overlayInput); // stop listening for pressed keys
        body.style.pointerEvents = 'auto'; // set pointer events to default value (auto)
        currentPlayer = 1; // set the current player to player 1
    }
    // an alert for an input that isn't any of the above is unneccesary    
}
// this function creates the random character icon and has it's own functions and properties
const randomFighter = () => {
    let img = document.createElement('img');
    img.setAttribute('src', 'images/fighters/portraits/Random.png');
    img.classList.add('icon');
    img.classList.add('randomButton');
    img.addEventListener('click', function(){
        let pick = random();
        if (currentPlayer === 1){
            // get the img that has the id of pick value, then grab the parent element (iconContainer),
            // then pick the child element with the class of p1
            document.getElementById(pick).parentElement.querySelector('.p1').style.display = 'block';
        } else if (currentPlayer === 2){
            document.getElementById(pick).parentElement.querySelector('.p2').style.display = 'block';
        }
        selectFighter(fighters[pick], pick);
        // instead of trying to get record of the dom element, just use "this"
        if (this.classList.contains('player1selected')){ // check if this icon has this class
            this.classList.remove('player1selected'); // if it does, then remove the "player1selected" class
        } else if (this.classList.contains('player2selected')){
            this.classList.remove('player2selected');
        }
    });
    img.addEventListener('mouseover', function(){ // this is just listening for mouse hovering
        if (currentPlayer === 1){
            img.classList.add('player1selected');
            display1[1].innerText = 'Random';
            display1[2].src = ''; // because random isn't a fighter, there's no need to display an image
        } else if (currentPlayer === 2) {
            img.classList.add('player2selected');
            display2[1].innerText = 'Random';
            display2[2].src = '';
        }
    });
    img.addEventListener('mouseout', function(){ // this is listening for a mouse exits hovering an element
        if (currentPlayer === 1){
            img.classList.remove('player1selected');
        } else if (currentPlayer === 2){
            img.classList.remove('player2selected')
        }
    });
    selectScreen.appendChild(img);
}
// when a player hovers over an icon, display the fullbody picture
const previewFighter = (item) => {
    if (currentPlayer === 1){
        let fighterImg = display1[2];
        fighterImg.classList.add('preview'); // add the class "preview" to the "fighterImg" element
        fighterImg.setAttribute('src', item.full); // grab the "full" attribute from a fighter object
        display1[1].innerText = item.name; // grab the "name" attribute from a fighter object
    } else if (currentPlayer === 2){
        let fighterImg = display2[2];
        fighterImg.classList.add('preview');
        fighterImg.setAttribute('src', item.full);
        display2[1].innerText = item.name;
    }

}
const selectFighter = (elem, iconNumber) => {
    let playerIcon = document.getElementById(iconNumber); // queryselector doesn't allow for id unless you use brackets ie [id='0']
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
        // create an element for player indication
        // create a div to store image and player indicator
        let iconContainer = document.createElement('div');
        iconContainer.classList.add('iconContainer');
        let player1Indicator = document.createElement('span');
        player1Indicator.innerText = 'P1';
        player1Indicator.classList.toggle('p1');
        player1Indicator.style.display = 'none';
        let player2Indicator = document.createElement('span');
        player2Indicator.innerText = 'P2';
        player2Indicator.classList.toggle('p2');
        player2Indicator.style.display = 'none';
        let img = document.createElement('img');
        img.setAttribute('src', fighters[i].portrait);
        img.setAttribute('class', 'icon');
        img.setAttribute('id', i);
        img.addEventListener('click', function(){
            selectFighter(fighters[this.id], this.id);
            if (currentPlayer === 1){
                player1Indicator.style.display = 'block';
            } else if (currentPlayer === 2){
                player2Indicator.style.display = 'block';
            }
        });
        img.addEventListener('mouseover', function(){
            if (currentPlayer === 1){
                player1Indicator.style.display = 'block';
                img.classList.add('player1selected');
            } else if (currentPlayer === 2){
                player2Indicator.style.display = 'block';
                img.classList.add('player2selected');
            }
            previewFighter(fighters[this.id]);
        });
        img.addEventListener('mouseout', function(){
            if (currentPlayer === 1){
                player1Indicator.style.display = 'none';
                img.classList.remove('player1selected');
            } else if (currentPlayer === 2){
                player2Indicator.style.display = 'none';
                img.classList.remove('player2selected');
            }
        });
        iconContainer.appendChild(player1Indicator);
        iconContainer.appendChild(player2Indicator);
        iconContainer.appendChild(img);
        selectScreen.appendChild(iconContainer);
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