// ! I used an extension that makes comment ancors thats why all of my comments have ! in front of them

// ! canvas
const canvas = document.getElementById("gamecanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * .99;
canvas.height = window.innerHeight * .99;

// ! variables and objects
const fps ={
    now : 0,
    then : Date.now(),
    interval : 0,
    start : 0,
    elapsed : 0,
    fps : 0,
};

const fpsset={
    now : 0,
    then : Date.now(),
    interval : 1000/60, // put 1000/fps you want. slower fps means slower game.
    elapsed : 0,

};

const player = {
    x: 150,
    y: 150,
    color: "lightblue",
    speed: 7,
    dx: 0,
    dy: 0,
    score: 0,
    radius: 50,
    stroke: "black",
    level: 1,
    damage: 1,
    money : 0,
    armor: false,
};

const levels = {
    level1: {
        name: "level1",
        enemies: 5,
    },
}

const presets = {
    arrows:{
        arrowspeed: (chargeTime) => {
            let speed = Math.sqrt(chargeTime * 5 ) * 1
            if (speed < .5){
                speed = 1;
            }
            return speed;
        },
        damage: (chargeTime) => {
            return player.damage + (chargeTime+1)/30;
        }
    },

    opps:{
        enemies:{
            enemiespeed: (lifetime) => {
                return 3 * Math.floor((Math.sin(lifetime)+2));
            },
            enemycolor: "#e5694e",
            health: 1,
        },

    },
    turrets:{
       setangle:(turret,target)=>{
        if (target) {
            const dx = target.x - (turret.x + turret.w / 2);
            const dy = target.y - (turret.y + turret.w / 2);
            turret.angle = Math.atan2(dy, dx);
        }
    },
    cooldown:180,
}
};

const keys = {};

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
};

const game = { 
    state: "playing",
};

const opps = {
    enemies : [],
};

const arrows = [];
const coins = [];
const turrets = [];
const darts = [];

const upgradebuttons = {
    armor:{
        x: 110,
        y: 110,
        width: 120,
        height: 100,
        text: "armor",
        owned: false,
        lockedcolor: "grey",
        color: "yellow",
        cost: 10,
        onclick: ()=>{
            if(player.money >= upgradebuttons.armor.cost && !upgradebuttons.armor.owned){
                player.money -= upgradebuttons.armor.cost
                upgradebuttons.armor.owned = true;
                upgradebuttons.armor.color = upgradebuttons.armor.lockedcolor;
                player.armor = true;
            }
        },
        remove: ()=>{
            upgradebuttons.armor.owned = false;
            upgradebuttons.armor.color = "yellow";
            player.armor = false;
        }
        },
    turret:{
        x: 250,
        y: 110,
        width: 120,
        height: 100,
        text: "turret",
        owned: 0,
        lockedcolor: "grey",
        color: "yellow",
        cost: 100,
        onclick: ()=> {
            if (player.money >= upgradebuttons.turret.cost) {
                player.money -= upgradebuttons.turret.cost;
                upgradebuttons.turret.owned += 1;
                const turretX = Math.random() * (canvas.width - 100) + 50; 
                const turretY = Math.random() * (canvas.height - 100) + 50;
                const turretSize = 50;
                maketurret(turretX, turretY, turretSize);
            }
        }
    }
}

// ! draw functions

function circle(x, y, r, color, stroke, transparency = 1) {
    ctx.save();
    ctx.globalAlpha = transparency;
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = stroke;
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

drawplayer = function(x,y,r,color,stroke){
    circle(x,y,r,color,stroke);
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
    ctx.textAlign = "left";
    ctx.fillText("Score: " + player.score+"  Coins: "+player.money, 100, 50);

}

function drawenemy(x, y, color, width){ 
    ctx.fillStyle = color;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const radius = 10;
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + width - radius);
    ctx.quadraticCurveTo(x + width, y + width, x + width - radius, y + width);
    ctx.lineTo(x + radius, y + width);
    ctx.quadraticCurveTo(x, y + width, x, y + width - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    
}

function drawpause(){
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Paused", canvas.width / 2 - 100, canvas.height / 2);
    ctx.fillText("Press P to continue", canvas.width / 2 - 200, canvas.height / 2 + 50);
}

function drawdied(){
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, 100);
    ctx.fillText("Score: " + player.score, canvas.width / 2, 150);
    ctx.fillText("Press R to Restart", canvas.width / 2, 200);
}

function drawenemys(){
    opps.enemies.forEach(enemy => {
        drawenemy(enemy.x, enemy.y,enemy.color,enemy.width);
        enemy.lifetime++;
    });
    if(opps.enemies.length < player.score/5+1){
        makeenemy();
    }
}

function drawcoin(coin){
    circle(coin.x, coin.y, coin.radius, coin.color, coin.stroke);
}

function drawcoins(){
    coins.forEach(coin => {
        drawcoin(coin);
    });
}

function squareoutline(x,y,w,h){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.rect(x, y, w , h); 
    ctx.stroke();
    ctx.closePath();
}

function drawlupgrade(){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.fillRect(100, 100, canvas.width-200 , canvas.height-200); 
    ctx.rect(100, 100, canvas.width-200 , canvas.height-200); 
    ctx.stroke();
    ctx.closePath();
    Object.keys(upgradebuttons).forEach(key => {
        const element = upgradebuttons[key];
        ctx.fillStyle = element.color;
        ctx.fillRect(element.x,element.y,element.width,element.height);
        squareoutline(element.x,element.y,element.width,element.height);
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        const lines = [element.text, "owned: " + element.owned, "cost: " + element.cost];
        lines.forEach((line, index) => {
            ctx.fillText(line, element.x + element.width / 2, element.y + element.height / 2 - 7 + index * 20);
        });

    });
}

function drawlarmor(){
    if(player.armor){
    circle(player.x,player.y,player.radius+10,"blue","black",.3);
}
}

function drawturret(x,y,w,angle){
    ctx.fillRect(x,y,w,w);
    circle(x+w/2,x+w/2);
    ctx.fillStyle = "brown";
    ctx.fillRect(x, y, w, w);
    circle(x + w / 2, y + w / 2, w / 3, "grey", "black");
    ctx.save();
    ctx.translate(x + w / 2, y + w / 2);
    ctx.rotate(angle);
    ctx.fillStyle = "darkgray";
    ctx.fillRect(0, -w / 8, w/1.5, w / 4);
    ctx.restore();
}

function drawturrets(){
    turrets.forEach(turret => {
    drawturret(turret.x, turret.y, turret.w, turret.angle);
});
}

function drawdart(x,y){
    circle(x,y,5,"grey","black");
}
function drawdarts(){
    darts.forEach(dart => {
        drawdart(dart.x,dart.y);
    });
}


// ! math functions
function fire(){
    if(bow.charging){
        bow.chargetime++;
        bow.radius = 100 + presets.arrows.arrowspeed(bow.chargetime)/3;
        bow.midpoint = 45 - presets.arrows.arrowspeed(bow.chargetime)/3;
    }
    if(bow.firing){
        bow.frame++;
        if(bow.frame > bow.cooldown){
            bow.firing = false;
            bow.frame = 0;
        }
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

function movedarts(){
    darts.forEach(arrow => {
        arrow.x += arrow.dx;
        arrow.y += arrow.dy;
        if (arrow.x > window.innerWidth || arrow.x < 0) {
            darts.splice(darts.indexOf(arrow),1);
        }
        if (arrow.y > window.innerHeight || arrow.y < 0) {
            darts.splice(darts.indexOf(arrow),1);
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
    if (player.x > window.innerWidth) {
        player.x = window.innerWidth;
    }    
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.y > window.innerHeight) {
        player.y= window.innerHeight;
    }
    if (player.y < 0) {
        player.y = 0;
    }
}

function onhitplayer(){
    if (player.armor){
        upgradebuttons.armor.remove();
    } else {
    game.state = "died"
    }
}

function onhitenemy(prodj,enemy,prodjarray){
        prodjarray.splice(prodjarray.indexOf(prodj), 1);
        enemy.health -= prodj.damage;
        ctx.fillStyle = "red";
        ctx.globalAlpha = 0.5;
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.width);
        enemy.color = "red";
        ctx.globalAlpha = 1;
        if(enemy.health <= 0){
        player.score++;
        opps.enemies.splice(opps.enemies.indexOf(enemy), 1);
        makecoin(enemy.x, enemy.y);
    }
}


function mousemove(e){
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    bow.Angle = Math.atan2(mouseY - player.y, mouseX - player.x);
}

function makeenemy(){
    opps.enemies.push({
        x: window.innerWidth + 100,
        y: Math.random() * (window.innerHeight-100),
        color: presets.opps.enemies.enemycolor,
        lifetime: 0,
        speed: (x) => presets.opps.enemies.enemiespeed(x),
        width: 50,
        health: presets.opps.enemies.health,
        target: {
            x: Math.random() * (window.innerWidth-100),
            y: Math.random() * (window.innerHeight-100),
        },
    });
}

function moveenemies(){
    opps.enemies.forEach(enemy => {
        moveenemy(enemy);
    });
}

function moveenemy(enemy){
    if(Math.abs(enemy.x - enemy.target.x) < enemy.speed(enemy.lifetime) && Math.abs(enemy.y - enemy.target.y) < enemy.speed(enemy.lifetime)){
        if (Math.random() < 0.2){
            enemy.target.x = player.x
            enemy.target.y = player.y;
        }else{
        enemy.target.x = Math.random() * (canvas.width-100);
        enemy.target.y = Math.random() * (canvas.height-100);
        }
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

function resetgame(){
    game.state = "playing";
    player.x = 150;
    player.y = 150;
    player.dx = 0;
    player.dy = 0;
    player.score = 0;
    opps.enemies.length = 0;
    arrows.length = 0;
    coins.length =0;
    player.money = 0;
    darts.length = 0;
    turrets.length = 0;
    upgradebuttons.turret.owned = 0;
}

function movecoin(coin){
    coin.target.x = player.x - player.radius/2;
    coin.target.y = player.y + player.radius/2;
    if(Math.abs(coin.x - coin.target.x) < player.radius && Math.abs(coin.y - coin.target.y) < player.radius){
        coins.splice(coins.indexOf(coin), 1);
        player.money++;
    }
    if(Math.abs(coin.x-coin.target.x) > coin.radius){
        const dx = Math.sign(coin.target.x - coin.x) * coin.speed;
        coin.x += dx;
    } else {
        const dx = 0;
    }
    if(Math.abs(coin.y-coin.target.y) > coin.radius){
        const dy = Math.sign(coin.target.y - coin.y) * coin.speed;
        coin.y += dy;
    } else {
        const dy = 0;
    }
}

function movecoins(){
    coins.forEach(coin => {
        movecoin(coin);
    });
}

function makecoin(x,y){
    coins.push({
        x:x,
        y:y,
        color:"gold",
        radius: 7,
        stroke: "black",
        speed: 5,
        lifetime: 0,
        target: {
            x: player.x,
            y: player.y,
        },
    });
}

function maketurret(x,y,w){
    turrets.push({
        x:x,
        y:y,
        w:w,
        cooldown:180+Math.random()*180,
        maxcooldown:presets.turrets.cooldown,
        target: null,
        angle: 0,
        shootspeed: 7,
        setangle: (turret,target)=>{
            presets.turrets.setangle(turret,target);
        }
        })
    };

function targetturets(){
    turrets.forEach(turret => {

    if (turret.cooldown <= 0) {
        const target = opps.enemies.find(enemy => {
            const dx = enemy.x - (turret.x + turret.w / 2);
            const dy = enemy.y - (turret.y + turret.w / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance;
        });

        if (target) {
            turret.setangle(turret, target);
            darts.push({
                x: turret.x + turret.w / 2,
                y: turret.y + turret.w / 2,
                speed: turret.shootspeed,
                dx: Math.cos(turret.angle) * 10,
                dy: Math.sin(turret.angle) * 10,
                angle: turret.angle,
                damage: 2,
            });
            turret.cooldown = turret.maxcooldown;
        }
    } else {
        turret.cooldown--;
    }
});
}

// ! collision detection

function allcolisions(){
    arrows.forEach(arrow => {
        if(colisioncircle(arrow, player)){
            arrows.splice(arrows.indexOf(arrow), 1);
            onhitplayer();
        }
        opps.enemies.forEach(enemy => {
            if(colisionsquare(arrow, enemy)){
                onhitenemy(arrow,enemy,arrows);
            }
        });
    });
    opps.enemies.forEach(enemy => {
        if(squarewithcirclecolisions(player, enemy)){
            opps.enemies.splice(opps.enemies.indexOf(enemy),1)
            onhitplayer();
        }
        darts.forEach(dart =>{
            if (colisioncircle(dart,enemy)){
                onhitenemy(dart,enemy,darts);
            }
    })
    });
}

function colisioncircle(arrow, object){
    const dx = arrow.x - object.x;
    const dy = arrow.y - object.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < object.radius || distance < object.width) {
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

function squarewithcirclecolisions(player, enemy) {
    const dx = player.x - (enemy.x + enemy.width / 2);
    const dy = player.y - (enemy.y + enemy.width / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < player.radius + enemy.width / 2) {
        return true;
    }
    return false;
}

function upgradeclick(x,y){
    if(x<background.width/2+30 && x>background.width/2-30 && y<40){
        return true;
    }
    return false;
}

function Clicksquare(x,y,object){
    if(x > object.x && x < object.x + object.width && y > object.y && y < object.y + object.height){
     return true;
    }
    return false;
}

function upgradeclicks(x,y){
    Object.keys(upgradebuttons).forEach(key => {
        const element = upgradebuttons[key];
        if( Clicksquare(x,y,element)){
            element.onclick();
        }
    });
}




// ! listiners
function listen(){
   document.addEventListener("mousemove", mousemove);
   document.addEventListener("keydown", keydown);
   document.addEventListener("keyup", keyup);
    document.addEventListener("mousedown", mousedown);
    document.addEventListener("mouseup", mouseup);
}

function mousedown(e){
    if(e.clientX > background.width - 35 && e.clientY < 40 && (game.state === "playing" || game.state === "paused")){
        game.state === "paused" ? game.state = "playing" : game.state = "paused";
        return;
    }
    if(upgradeclick(e.clientX,e.clientY) && (game.state === "playing" || game.state === "upgrading")){
        game.state === "upgrading" ? game.state = "playing" : game.state = "upgrading";
        return;
    }
    if(game.state === "upgrading"){
        upgradeclicks(e.clientX,e.clientY);
        return;
    }
    if (game.state === "playing"){
        if(bow.firing) return;
        bow.charging = true;
    }
}

function mouseup(e){
    if(game.state === "playing" && bow.chargetime>0){
    if(bow.firing) return;
    bow.charging = false;
    bow.firing = true;
    arrows.push({
        x: player.x + bow.radius * Math.cos(bow.Angle),
        y: player.y + bow.radius * Math.sin(bow.Angle),
        speed: presets.arrows.arrowspeed(bow.chargetime),
        dx: Math.cos(bow.Angle) * presets.arrows.arrowspeed(bow.chargetime),
        dy: Math.sin(bow.Angle) * presets.arrows.arrowspeed(bow.chargetime),
        angle: bow.Angle,
        damage: presets.arrows.damage(bow.chargetime),
    });
    bow.chargetime = 0;
    bow.radius = 100;
    bow.midpoint = 45;
}
}

function keydown(e){
    keys[e.key.toLowerCase()] = true; 
    if(e.key == " " || e.key == "q"){
        mousedown(e);
    }
    if(e.key === "p" && (game.state === "playing" || game.state === "paused")){
        game.state === "paused" ? game.state = "playing" : game.state = "paused";
    }
    if(e.key === "r" && game.state === "died"){
        resetgame();
    }
    if(e.key === "u" && (game.state === "playing" || game.state === "upgrading")){
        game.state === "upgrading" ? game.state = "playing" : game.state = "upgrading";
    } 
}

function keyup(e){
    keys[e.key.toLowerCase()] = false;
    if(e.key == " " || e.key == "q"){
        mouseup(e); 
    }
}

// ! main loop

function animate() {
    // requestAnimationFrame(animate); acutally runs at what ever speed it wants so... fps setting. idk if it works tbh but i try.
    if (fpslimiter()) {
    // fpscheck();
    
    // I need to remember to keep the clear rect at the top
    if (game.state === "playing") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // pre-rendering math should probably be here
        move();
        movearrows();
        movecoins();
        allcolisions();
        moveenemies();
        fire();
        targetturets();
        movedarts();
        // draw
        drawplayer(player.x, player.y, player.radius, player.color,player.stroke);
        drawbow(player.x, player.y);
        drawenemys();
        drawcoins();
        drawlarmor();
        drawturrets();
        drawdarts();

        // player movement
        player.x += player.dx;
        player.y += player.dy;
        }

        if (game.state === "paused") {
            drawpause();
        }
        // for now the game stops rendering when it ends
        if (game.state === "died") {
            drawdied();
        }
        if (game.state === "upgrading"){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawplayer(player.x, player.y, player.radius, player.color,player.stroke);
            drawbow(player.x, player.y);
            drawenemys();
            drawcoins();
            drawlarmor();
            drawlupgrade();
        }
        scoreboard();
}

requestAnimationFrame(animate);
}

// ! running the functions

listen();
drawlevel();
animate();