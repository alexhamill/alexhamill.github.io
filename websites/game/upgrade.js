const upgradecanvas = document.getElementById("upgradecanvas");
const upgradectx = upgradecanvas.getContext("2d");
upgradecanvas.width = window.innerWidth * .99;
upgradecanvas.height = window.innerHeight * .99; 

const nodes = [
    {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        color: "black",
        id: 1,
        owned: false,
        parent: null,
        onclick: function() {
            console.log("Node clicked!");
        }
    },
    {
        x: 200,
        y: 0,
        width: 100,
        height: 100,
        color: "black",
        id: 2,
        owned: false,
        parent: 1,
        onclick: function() {
            console.log("Node clicked!");
        }
    }
];

function createNode(x, y, width, height, color, id, owned, parent)  { // im not going to use this
    nodes.push({
        x: x,
        y: y,
        width: width,
        height: width,
        color: color,
        id: id,
        owned: false,
        parent: parent,
        onclick: function() {

        }
    });
}

function drawNode(node) {
    console.log(node);
    upgradectx.fillStyle = node.color;
    upgradectx.fillRect(node.x, node.y, node.width, node.height);
    if(node.parent !== null) {
    parent = nodes.find(n => n.id === node.parent);
    upgradectx.beginPath();
    strokeStyle = "black";
    upgradectx.lineWidth = 30;
    console.log(parent);    
    upgradectx.moveTo(node.x + node.width / 2, node.y + node.height / 2);
    upgradectx.lineTo(parent.x + parent.width / 2, parent.y + parent.height / 2);
    upgradectx.stroke();
    }
}

function drawtree(){
    nodes.forEach(node => {
        drawNode(node);
    });
}

drawtree();