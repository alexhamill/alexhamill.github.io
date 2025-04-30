// canvas

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight-5;

// variables and objects
const player = {
    x: 150,
    y: 150,
    color: "blue",
    speed: 7,
    dx: 0,
    dy: 0,
    score: 0
}
const arrowsetings = {
    speed: (chargeTime) => {
        return Math.sqrt(chargeTime * 5 ) * 1;
    },
};
const keys = {}
const bow = {
    Angle: Math.PI/2,
    firing: false,
    charging: false,
    cooldown: -1,
    frame: 0,
    size: Math.PI * 0.7,
    chargetime: 0,
    radius: 100,
    midpoint: 45,
}
const arrows = [];
const game = { 
    state: true
}
// draw functions
function circle(x,y,r,color){
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawbow(x,y){
    ctx.beginPath();
    ctx.lineWidth = 7;
    ctx.strokeStyle = "#8e4839";
    ctx.arc(x, y, bow.radius, bow.Angle - (bow.size)/2, bow.Angle + (bow.size)/2, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.moveTo(x + bow.radius * Math.cos(bow.Angle + (bow.size)/2), y + bow.radius * Math.sin(bow.Angle + (bow.size)/2));
    ctx.lineTo(x + bow.midpoint * Math.cos(bow.Angle), y + bow.midpoint * Math.sin(bow.Angle));
    ctx.lineTo(x + bow.radius * Math.cos(bow.Angle - (bow.size)/2), y + bow.radius * Math.sin(bow.Angle - (bow.size)/2));
    ctx.stroke();
}

function drawarrow(x,y,angle){
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = "#8e4839";
    ctx.fillRect(-5, -5, 25, 10);
    ctx.beginPath();
    ctx.moveTo(30, 0);
    ctx.lineTo(20, -7);
    ctx.lineTo(20, 7);
    ctx.closePath();
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-8, -10);
    ctx.lineTo(-8, 10);
    
    ctx.moveTo(-5, 0);
    ctx.lineTo(-13, -10);
    ctx.lineTo(-13, 10);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.restore();
}

function scoreboard(){
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + player.score, 10, 50);
}


// main loop
function animate() {

    // I need to rember to keep the clear rect at the top
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // pre rendering math should prob be here
    move();
    movearrows();
    
    //draw
    circle(player.x, player.y, 50, player.color);
    drawbow(player.x, player.y);
    scoreboard();
    fire();
    
    // player movement
    player.x += player.dx;
    player.y += player.dy;

    // for now the game stops rendering when it ends
    if(game.state){
        requestAnimationFrame(animate);
    }
}

// math functions
function fire(){
    if(bow.charging){
        bow.chargetime++;
        bow.radius = 100 + arrowsetings.speed(bow.chargetime)/3;
        bow.midpoint = 45 - arrowsetings.speed(bow.chargetime)/3;
    }
    if(bow.firing){
        bow.frame++;
        if(bow.frame > bow.cooldown){
            bow.firing = false;
            bow.frame = 0;
        }
    }
}

function movearrows(){
    arrows.forEach(arrow => {
        arrow.x += arrow.dx;
        arrow.y += arrow.dy;
        drawarrow(arrow.x, arrow.y, arrow.angle);
        if (arrow.x > window.innerWidth || arrow.x < 0) {
            arrow.x = window.innerWidth-(arrow.x);
        }
        if (arrow.y > window.innerHeight || arrow.y < 0) {
            arrow.y = window.innerHeight-(arrow.y);
        }
    });
}

function move(){
    if(keys["w"]){
        player.dy = -player.speed;
    } else if(keys["s"]){
        player.dy = player.speed;
    } else {
        player.dy = 0;
    }
    if(keys["a"]){
        player.dx = -player.speed;
    } else if(keys["d"]){
        player.dx = player.speed;
    } else {
        player.dx = 0;
    }
}

function mousemove(e){
    // console.log("mousemove",e);
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    bow.Angle = Math.atan2(mouseY - player.y, mouseX - player.x);
    // console.log("angle", bow.Angle);
}

// listiners
function listen(){
   document.addEventListener("mousemove", mousemove);
   document.addEventListener("keydown", keydown);
   document.addEventListener("keyup", keyup);
    document.addEventListener("mousedown", mousedown);
    document.addEventListener("mouseup", mouseup);
}

function mousedown(e){
    if(bow.firing) return;
    bow.charging = true;
}

function mouseup(e){
    if(bow.firing) return;
    bow.charging = false;
    bow.firing = true;
    arrows.push({
        x: player.x + bow.radius * Math.cos(bow.Angle),
        y: player.y + bow.radius * Math.sin(bow.Angle),
        speed: arrowsetings.speed(bow.chargetime),
        dx: Math.cos(bow.Angle) * arrowsetings.speed(bow.chargetime),
        dy: Math.sin(bow.Angle) * arrowsetings.speed(bow.chargetime),
        angle: bow.Angle,
    });
    bow.chargetime = 0;
    bow.radius = 100;
    bow.midpoint = 45;
}

function keydown(e){
    keys[e.key] = true;
}

function keyup(e){
    keys[e.key] = false;
}



// running the functions
listen();
animate();