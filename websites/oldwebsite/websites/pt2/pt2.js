var speed = 10;
const mydiv = document.getElementById("person");
var keysPressed = {};
var bf = ['assets/f1.png', 'assets/f2.png', 'assets/f3.png'];
var ff = ['assets/b1.png', 'assets/b2.png', 'assets/b3.png'];
var lf = ['assets/l1.png', 'assets/l2.png', 'assets/l3.png'];
var rf = ['assets/r1.png', 'assets/r2.png', 'assets/r3.png'];
var sf = ['assets/f1.png','assets/f1.png','assets/f1.png']
var cfi = 0; 
var currentFrames = sf; 
var frameSpeed = 75;

function keydown(){
    document.addEventListener("keydown", down);
    document.addEventListener("keyup", up);
    function down(event) {
        keysPressed[event.key.toLowerCase()] = true;
      }
      function up(event) {
        keysPressed[event.key.toLowerCase()] = false;
      }
}
function move(){
    mydiv.style.backgroundImage = "url('" + gcf()[cfi] + "')";
    cfi++;
    if (cfi >= gcf().length) {
        cfi = 0; 
    }
    if(keysPressed['shift']){
        speed = 20;
    }else{
        speed = 10;
    }
    if(keysPressed['w']){
        const y = Number(mydiv.style.top.replaceAll('px',""));
        mydiv.style.top = (y - speed) + 'px';

    }
    if(keysPressed['a']){
        const y = Number(mydiv.style.left.replaceAll('px',""));
        mydiv.style.left = (y - speed) + 'px';

    }
    if(keysPressed['s']){
        const y = Number(mydiv.style.top.replaceAll('px',""));
        
        mydiv.style.top = (y + speed) + 'px';

    }
    if(keysPressed['d']){
        const y = Number(mydiv.style.left.replaceAll('px',""));
        mydiv.style.left = (y + speed) + 'px';
    }
    
    
}

    function gcf() {
        if (keysPressed['w']) {
            currentDirection = 'forward';
            return ff;
        } else if (keysPressed['s']) {
            currentDirection = 'backward';
            return bf;
        } else if (keysPressed['a']) {
            currentDirection = 'left';
            return lf;
        } else if (keysPressed['d']) {
            currentDirection = 'right';
            return rf;
        }
        return sf; 
        }
setInterval(move, frameSpeed);
move();
keydown();