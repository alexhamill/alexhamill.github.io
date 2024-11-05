function changecolor(event){
  event.currentTarget.classList.toggle('active');}

function listiners(){
  var button = document.querySelectorAll('.box');
  button.forEach(function(button) {
    button.addEventListener('click', changecolor)
  });

}