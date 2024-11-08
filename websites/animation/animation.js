var score = 0;  
function move(event) {
    var cube = event.currentTarget;
    const ranx = Math.floor(Math.random()*(window.innerWidth-50));
    const rany = Math.floor(Math.random()*(window.innerHeight-50));
    cube.style.transform = `translate(${ranx}px, ${rany}px`
    cube.classList.add('active');
    score = score + 1;
    document.querySelector('.score').textContent = score;
  }

  
  
  function Listeners() {
    var cubes = document.querySelectorAll('.cube'); 
    cubes.forEach(function(cube) {
      cube.addEventListener('mouseenter', move);
    });
  }
  
  Listeners();