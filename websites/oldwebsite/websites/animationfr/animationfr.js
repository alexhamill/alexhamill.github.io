const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight-5;
const enemy = {
    x: 50,
    y: 50,
    dx: 5,
    dy: 4
};
const keys = {}
const player = {
    x: 50,
    y: 50,
    color: "blue",
    speed: 7,
    dx: 0,
    dy: 0,
    score: 0
}
//define functions
function drawRect(x,y) {
    console.log("drawing rect");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(x,y,50,50);
    ctx.fill();
}
function circle(x,y,r,color){
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function snowman(x,y){
    
    circle(x,y,10,"white");
    circle(x,y+20,20,"white");
    circle(x,y+50,30,"white");
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    move();
    circle(player.x, player.y, 100, player.color);
    snowman(enemy.x, enemy.y);
    drawscoreboard();
    if (enemy.x + 50 > window.innerWidth || enemy.x < 0) {
        enemy.dx = -enemy.dx;
    }
    if (enemy.y + 50 > window.innerHeight || enemy.y < 0) {
        enemy.dy = -enemy.dy;
    }
    if (player.x > window.innerWidth || player.x < 0) {
        player.x = window.innerWidth-(player.x);
    }
    if (player.y > window.innerHeight || player.y < 0) {
        player.y = window.innerHeight-(player.y);
    }
    enemy.x += enemy.dx;
    enemy.y += enemy.dy;
    player.x += player.dx;
    player.y += player.dy;

    requestAnimationFrame(animate);
}

//call our function
function drawscoreboard(){
    ctx.font = "10px Arial";
    ctx.fillText("Score: " + player.score, 10, 20);
    ctx.fillText("Player Position: (" + player.x + ", " + player.y + ")", 10, 40);
    ctx.fillText("Enemy Position: (" + enemy.x + ", " + enemy.y + ")", 10, 60);
    ctx.fillText("Player Speed: " + player.speed, 10, 80);
    ctx.fillText("Enemy Speed: (" + enemy.dx + ", " + enemy.dy + ")", 10, 100);
}

function listen(){
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
}
function keydown(e){
    keys[e.key] = true;
}
function keyup(e){
    keys[e.key] = false;
}
function jump(x){
    const originalSpeed = player.speed;    
    player.speed = 10;
    console.log(player.speed);
    if(x < 50){
        circle(player.x, player.y, x+100, player.color);
        requestAnimationFrame(() => jump(x+1));
    } else if(x >= 50 && x < 100){
        circle(player.x, player.y, (50-x%50)+100, player.color);    
        requestAnimationFrame(() => jump(x+1));
    } else {
        player.speed = originalSpeed; 
    }
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

animate();
listen();