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


const player = {
    x: 50,
    y: 50,
    color: "blue",
    speed: 5,
    dx: 0,
    dy: 0
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
    player.x += player.dx;
    player.y += player.dy;
    circle(player.x, player.y, 100, player.color);
    snowman(enemy.x, enemy.y);
    if (enemy.x + 50 > window.innerWidth || enemy.x < 0) {
        enemy.dx = -enemy.dx;
    }
    if (enemy.y + 50 > window.innerHeight || enemy.y < 0) {
        enemy.dy = -enemy.dy;
    }
    if (player.x + 50 > window.innerWidth || player.x < 0) {
        player.dx = -player.dx;
    }
    if (player.y + 50 > window.innerHeight || player.y < 0) {
        player.dy = -player.dy;
    }
    enemy.x += enemy.dx;
    enemy.y += enemy.dy;

    requestAnimationFrame(animate);
}

//call our function
animate();

function listen(){
    document.addEventListener("keydown", moveplayer);
    document.addEventListener("keyup", stopplayer);
}
function moveplayer(e){
    // console.log(player.speed)
    if(e.key == "w"){
        player.dy = -player.speed;
    }
    if(e.key == "s"){
        player.dy = player.speed;
    }
    if(e.key == "a"){
        player.dx = -player.speed;
    }
    if(e.key == "d"){
        player.dx = player.speed;
    }
    if(e.key == " "){
        requestAnimationFrame(() => jump(0));
    }
}
listen();
function stopplayer(e){
    if(e.key == "w" || e.key == "s"){
        player.dy = 0;
    }
    if(e.key == "a" || e.key == "d"){
        player.dx = 0;
    }
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