var count = 300;
var i =0;
var middle=10;
var middlecount=0;
var middlefrac = 4;
function createFallingLetter() {
    var letter = document.createElement("p");
    document.body.appendChild(letter);
    letter.classList.add("fallingletters");
    var randomX = Math.floor(Math.random() * window.innerWidth);
    while(middle>middlecount && randomX>window.innerWidth/2-window.innerWidth/middlefrac && randomX<window.innerWidth/2+window.innerWidth/middlefrac){
        randomX = Math.floor(Math.random() * window.innerWidth);
    }
    if(middlecount>middle && randomX>window.innerWidth/2-window.innerWidth/middlefrac && randomX<window.innerWidth/2+window.innerWidth/middlefrac){
        middlecount=0;
    }
    middlecount++;
    letter.style.animation = "fall " + (Math.random()*.1+1.9) + "s linear infinite";
    letter.style.position = "absolute";
    letter.style.left = randomX + "px";
    letter.innerText = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    document.body.appendChild(letter);
}

function createLettersWithTimeout() {
    if (i < count) {
        createFallingLetter();
        i++;
        setTimeout(createLettersWithTimeout, 150);
    }
}
createLettersWithTimeout();

createLettersWithTimeout();
// while (i < count) {
//     var letter = document.createElement("p");
//     document.body.appendChild(letter);
//     letter.classList.add("fallingletters");
//     var randomX = Math.floor(Math.random() * window.innerWidth);
//     letter.style.position = "absolute";
//     letter.style.left = randomX + "px";
//     letter.innerText = String.fromCharCode(65 + Math.floor(Math.random() * 26));
//     document.body.appendChild(letter);
//     i++;
// }