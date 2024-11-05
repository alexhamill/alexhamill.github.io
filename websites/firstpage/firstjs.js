function changecolor(event){
  event.currentTarget.classList.toggle('active');}

function listiners(){
  var boxes = document.querySelectorAll('.box');
  boxes.forEach(function(box) {
    boxes.addEventListener('click', changecolor)
  });

}
listiners();
