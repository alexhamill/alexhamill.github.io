// canvas
const canvas = document.getElementById("gamecanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// variables and objects
const fps ={
    now : 0,
    then : Date.now(),
    interval : 0,
    start : 0,
    elapsed : 0,
    fps : 0,
}
const fpsset={
    now : 0,
    then : Date.now(),
    interval : 1000/60, // put 1000/fps you want slower fps means slower game
    elapsed : 0,

}
const player = {
    x: 150,
    y: 150,
    color: "blue",
    speed: 7,
    dx: 0,
    dy: 0,
    score: 0,
    radius: 50,
}
const presets = {
    arrowspeed: (chargeTime) => {
        let speed = Math.sqrt(chargeTime * 5 ) * 1
        if (speed < .5){
            speed = 1;
        }
        return speed;
    },
    enemiespeed: (lifetime) => {
        return 3 * Math.floor((Math.sin(lifetime)+2));
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

const game = { 
    state: "playing",
}
const arrows = [];
const enemies = [];
// draw functions
function circle(x,y,r,color){
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

drawplayer = function(x,y,r,color){
    circle(x,y,r,color);
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
    const offset = 5;
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = "#8e4839";
    ctx.fillRect(-20-offset, -5, 25, 10);
    ctx.beginPath();
    ctx.moveTo(15-offset, 0);
    ctx.lineTo(5-offset, -7);
    ctx.lineTo(5-offset, 7);
    ctx.closePath();
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-15-offset, 0);
    ctx.lineTo(-23-offset, -10);
    ctx.lineTo(-23-offset, 10);
    
    ctx.moveTo(-20-offset, 0);
    ctx.lineTo(-28-offset, -10);
    ctx.lineTo(-28-offset, 10);
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

function drawenemy(x, y, color, width){ 
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, width);
}

function drawenemys(){
    enemies.forEach(enemy => {
        drawenemy(enemy.x, enemy.y,enemy.color,enemy.width);
        enemy.lifetime++;
    });
    if(enemies.length < 2){
        makeenemy();
    }
}
function fpscheck(){
    fps.then = fps.now || Date.now();
    fps.now = Date.now();
    fps.elapsed = fps.now - fps.then;
    fps.fps = Math.round(1000 / fps.elapsed);
    console.log("fps:", fps.fps);
}
function fpslimiter(){
    fpsset.now = Date.now();
    fpsset.elapsed = fpsset.now - fpsset.then;
    if (fpsset.elapsed > fpsset.interval) {
        fpsset.then = fpsset.now - (fpsset.elapsed % fpsset.interval);
        return true;
    } else {
        return false;
    }
}

// main loop
function animate() {
    // requestAnimationFrame(animate); acutally runs at what ever speed it wants so... fps setting bs. idk if it works tbh but i try.
    if (fpslimiter()) {
    fpscheck();

    // I need to remember to keep the clear rect at the top
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // pre-rendering math should probably be here
    move();
    movearrows();
    allcolisions();
    moveenemies();

    // draw
    drawplayer(player.x, player.y, player.radius, player.color);
    drawbow(player.x, player.y);
    scoreboard();
    fire();
    drawenemys();

    // player movement
    player.x += player.dx;
    player.y += player.dy;

    // for now the game stops rendering when it ends
    if (game.state === "died") {
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Game Over", canvas.width / 2 - 190, 100);
        ctx.fillText("Score: " + player.score, canvas.width / 2 - 150, 200);
        return;
    }
}

requestAnimationFrame(animate);
}

// math functions
function fire(){
    if(bow.charging){
        bow.chargetime++;
        bow.radius = 100 + presets.arrowspeed(bow.chargetime)/3;
        bow.midpoint = 45 - presets.arrowspeed(bow.chargetime)/3;
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
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    bow.Angle = Math.atan2(mouseY - player.y, mouseX - player.x);
}

function makeenemy(){
    enemies.push({
        x: Math.random() * (window.innerWidth-100),
        y: Math.random() * (window.innerHeight-100),
        color: "red",
        lifetime: 0,
        speed: (x) => presets.enemiespeed(x),
        width: 50,
        target: {
            x: Math.random() * (window.innerWidth-100),
            y: Math.random() * (window.innerHeight-100),
        },
    });
}

function moveenemies(){
    enemies.forEach(enemy => {
        moveenemy(enemy);
    });
}

function moveenemy(enemy){
    if(Math.abs(enemy.x - enemy.target.x) < enemy.speed(enemy.lifetime) && Math.abs(enemy.y - enemy.target.y) < enemy.speed(enemy.lifetime)){
        enemy.target.x = Math.random() * (canvas.width-100);
        enemy.target.y = Math.random() * (canvas.height-100);//Math.random() * (canvas.height-100);
    }
    if(Math.abs(enemy.x-enemy.target.x) > enemy.speed(enemy.lifetime)){
        const dx = Math.sign(enemy.target.x - enemy.x) * enemy.speed(enemy.lifetime);
        enemy.x += dx;
    } else {
        const dx = 0;
    }
    if(Math.abs(enemy.y-enemy.target.y) > enemy.speed(enemy.lifetime)){
        const dy = Math.sign(enemy.target.y - enemy.y) * enemy.speed(enemy.lifetime);
        enemy.y += dy;
    } else {
        const dy = 0;
    }
}


// collision detection
function allcolisions(){
    arrows.forEach(arrow => {
        if(colisioncircle(arrow, player)){
            game.state = "died";
                arrows.splice(arrows.indexOf(arrow), 1);
        }
        enemies.forEach(enemy => {
            if(colisionsquare(arrow, enemy)){
                player.score++;
                arrows.splice(arrows.indexOf(arrow), 1);
                enemies.splice(enemies.indexOf(enemy), 1);
            }
        });
    });
}
function colisioncircle(arrow, object){
    const dx = arrow.x - object.x;
    const dy = arrow.y - object.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < object.radius) {
        return true;
    }
    return false;
}
function colisionsquare(arrow, object){
    if (arrow.x > object.x && arrow.x < object.x + object.width && arrow.y > object.y && arrow.y < object.y + object.width) {
        return true;
    }
    return false;
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
        speed: presets.arrowspeed(bow.chargetime),
        dx: Math.cos(bow.Angle) * presets.arrowspeed(bow.chargetime),
        dy: Math.sin(bow.Angle) * presets.arrowspeed(bow.chargetime),
        angle: bow.Angle,
    });
    bow.chargetime = 0;
    bow.radius = 100;
    bow.midpoint = 45;
}

function keydown(e){
    keys[e.key] = true; 
    if(e.key == " " || e.key == "q"){
        mousedown(e);
    }
}

function keyup(e){
    keys[e.key] = false;
    if(e.key == " " || e.key == "q"){
        mouseup(e); 
    }
}



// running the functions
listen();
drawFlowergrassfeild(100, 200);
animate();
