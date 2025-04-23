const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let x = 50;
let y = 50;
let dx = 5;
let dy = 4;

//define functions
function drawRect(x,y) {
    console.log("drawing rect");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y,50,50);
    ctx.fill();
}
function circle(x,y,r){
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
}

function snowman(x,y){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circle(x,y,10);
    circle(x,y+20,20);
    circle(x,y+50,30);
}

function animate() {
    snowman(x,y);
    
    if (x + 50 > window.innerWidth || x < 0) {
        dx = -dx;
        dy++;
        console.log("bounce",dx,dy);
        dy>0 ? dy++ : dy--;
    }
    if(y + 50 > window.innerHeight || y < 0) {
        dy = -dy;
        dx>0 ? dx++ : dx--;
        console.log("bounce",dx,dy);
    }
    x += dx;
    y += dy;
    requestAnimationFrame(animate);
}

//call our function
animate();