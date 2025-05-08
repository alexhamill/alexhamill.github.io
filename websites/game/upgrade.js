const upgradecanvas = document.getElementById("upgradecanvas");
const upgradectx = upgradecanvas.getContext("2d");
canvas.width = window.innerWidth * .99;
canvas.height = window.innerHeight * .99; 

const nodes = [
    {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        color: "#FF69B4",
        id: 1,
        owned: false,
        parent: null,
        onclick: function() {
            console.log("Node clicked!");
        }
    },
    {
        x: 200,
        y: 200,
        width: 100,
        height: 100,
        color: "#FF1493",
        id: 2,
        owned: false,
        parent: null,
        onclick: function() {
            console.log("Node clicked!");
        }
    }
];

function createNode(x, y, width, height, color, id, owned, parent)  {
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
    upgradectx.fillStyle = node.color;
    upgradectx.fillRect(node.x, node.y, node.width, node.height);
    upgradectx.beginPath();
    upgradectx.moveTo(node.x + width/2, node.y + height/2);
    upgradectx.lineTo(node.x + node.width, node.y);
    upgradectx.lineTo(node.x + node.width, node.y + node.height);
    upgradectx.lineTo(node.x, node.y + node.height);
    upgradectx.closePath();
    upgradectx.fill();
}