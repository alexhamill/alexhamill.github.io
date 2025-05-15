const background = document.getElementById("background");
const backctx = background.getContext("2d");
background.width = window.innerWidth * 1;
background.height = window.innerHeight * 1;
const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FF69B4','#ff6f6f','#d161f7',"#8a61ff","#61d7ff","#61ff8a","#ff6161","#ff61d7","#d7ff61"];

// random cube grass

function drawcubegrass(x, y, r, color) {
    backctx.save();
    backctx.translate(x, y);
    const angle = Math.random() * Math.PI * 2;
    backctx.rotate(angle);
    backctx.fillStyle = color;
    backctx.fillRect(-r / 2, -r / 2, r, r);
    backctx.restore();
}
function randomcubes(x){
for( let i = 0; i < x ; i++){
drawcubegrass(  
    Math.random() * (background.width+100) - 50 , 
    Math.random() * (background.height+100)- 50, 
    Math.random() * 5 + 100, 
    `rgb(0, ${Math.floor(Math.random() * 100 + 100)}, 0)`
);
}
}


// grid grass


function maketiles(size){
  const tileSize = size;

  for (let y = 0; y < background.height; y += tileSize) {
    for (let x = 0; x < background.width; x += tileSize) {
      const greenValue = Math.floor(Math.random() * 100) + 100;
      backctx.fillStyle = `rgb(0, ${greenValue}, 0)`;
      backctx.fillRect(x, y, tileSize, tileSize);
      backctx.strokeStyle = `rgba(0, ${greenValue - 20}, 0, 0.5)`;
      backctx.strokeRect(x, y, tileSize, tileSize);
    }
  }
}

// Nice grass feild



function drawGrassBlade(x, y, bladeLength, bladeWidth, angle, color) {
  backctx.save();
  backctx.translate(x, y);
  backctx.rotate(angle);
  backctx.beginPath();
  backctx.moveTo(0, 0); 
  backctx.lineTo(-bladeWidth / 2, -bladeLength);
  backctx.lineTo(bladeWidth / 2, -bladeLength);
  backctx.closePath();
  backctx.fillStyle = color;
  backctx.fill();
  backctx.restore();
}

function drawGrassCluster(cx, cy, numBlades) {
  for (let i = 0; i < numBlades; i++) {
    const offsetX = (Math.random() - 0.5) * 8;  
    const offsetY = (Math.random() - 0.5) * 8;
    const bladeLength = 10 + Math.random() * 8; 
    const bladeWidth  = 2 + Math.random() * 1.5; 
    const angle = -0.2 + Math.random() * 0.4;
    const greens = ['#7CB342', '#8BC34A', '#689F38', '#76B041'];
    const color = greens[Math.floor(Math.random() * greens.length)];
    drawGrassBlade(cx + offsetX, cy + offsetY, bladeLength, bladeWidth, angle, color);
  }
}

function drawGrassField(numClusters) {
  for (let i = 0; i < numClusters; i++) {
    const cx = Math.random() * background.width;
    const cy = Math.random() * background.height;
    const numBlades = Math.floor(3 + Math.random() * 4);
    drawGrassCluster(cx, cy, numBlades);
  }
}

function drawFlower(x, y, size) {
  backctx.save();
  backctx.translate(x, y);
  backctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]; 
  const numPetals = 5;
  for (let i = 0; i < numPetals; i++) {
    const angle = i * (2 * Math.PI / numPetals);
    const petalX = Math.cos(angle) * size;
    const petalY = Math.sin(angle) * size;
    backctx.beginPath();
    backctx.arc(petalX, petalY, size / 2, 0, 2 * Math.PI);
    backctx.fill();
  }
  backctx.fillStyle = "#FFFF00"; 
  backctx.beginPath();
  backctx.arc(0, 0, size / 2, 0, 2 * Math.PI);
  backctx.fill();
  backctx.restore();
}

function drawFlowerField(numFlowers) {
  for (let i = 0; i < numFlowers; i++) {
    drawFlower(Math.random() * background.width, Math.random() * background.height, 4 + Math.random() * 4);
  }
}
function drawFlowergrassfeild(flowers,grass){
  backctx.fillStyle = "#83e967"; 
  backctx.fillRect(0, 0, background.width, background.height);
  drawGrassField(grass);
  drawFlowerField(flowers);
}

function pausebutton(){
  backctx.fillStyle = "black";
  backctx.fillRect(background.width - 15, 10, 10, 30);
  backctx.fillRect(background.width - 35, 10, 10, 30);
}

function upgradebutton(){
  backctx.beginPath();
  backctx.moveTo(background.width/2 + 30,  5);
  backctx.lineTo(background.width/2 - 30, 5);
  backctx.lineTo(background.width/2,40)
  backctx.stroke();
  backctx.closePath();
  backctx.fill();
}

function line(){
  const startX = Math.random() * (background.width-background.width*.95)+background.width*.95;
  const startY = Math.random() * (background.height);
  const endY = startY + Math.random() * 50 - 25; // Random length and direction
  backctx.beginPath();
  backctx.moveTo(startX, startY);
  backctx.lineTo(startX, endY);
  backctx.strokeStyle = "white";
  backctx.lineWidth = 2;
  backctx.stroke();
}

function drawlriver(){
  backctx.fillStyle = "#039dfc";
  backctx.fillRect(background.width*.95,0,background.width*.10,background.height);
  backctx.fillStyle = "#6b3e2e";
  for (let i = 0; i < 100; i++) {
    line();
  }
  backctx.fillRect(background.width*.93,background.height/2-50,background.width*.7,100);
  backctx.beginPath();
  backctx.moveTo(background.width*.97,background.height/2-50);
  backctx.lineTo(background.width*.97,background.height/2+50);
  backctx.strokeStyle = "#47291e";
  backctx.stroke();
}

function drawlevel(){
  drawFlowergrassfeild(100, 200);
  drawlriver();
  pausebutton();
  upgradebutton();
}

