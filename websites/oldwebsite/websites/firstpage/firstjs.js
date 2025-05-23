
function changecolor(event) {
  var box = event.currentTarget;
  box.classList.toggle('active'); 
}


function Listeners() {
  var boxes = document.querySelectorAll('.box'); 
  boxes.forEach(function(box) {
    box.addEventListener('click', changecolor);
  });
}

Listeners();

