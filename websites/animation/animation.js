var score = 0;  
function move(event) {
    var cube = event.currentTarget;
    const ranx = Math.floor(Math.random()*(window.innerWidth-50));
    const rany = Math.floor(Math.random()*(window.innerHeight-50));
    cube.offsetLeft = ranx;
    cube.offsetTop = rany;
    cube.classList.add('active');
    score = score + 1;
    document.querySelector('.score').textContent = score;
    getcode();
  }

  
  
  function Listeners() {
    var cubes = document.querySelectorAll('.cube'); 
    cubes.forEach(function(cube) {
      cube.addEventListener('mouseenter', move);
    });
  }
  function exp(){
    const c1 = document.querySelector(".cube1");
    const c2 = document.querySelector(".cube2");
    const c3 = document.querySelector(".cube3");
    var code = score + "$" + c1.offsetLeft + "$" + c1.offsetTop + "$" + c2.offsetLeft + "$" + c2.offsetTop + c3.offsetLeft; + "$" + c3.offsetTop + "x";
    return code;
  }
  function getcode(){
    document.querySelector(".code").textContent=exp();
  }
  getcode();
  Listeners();
  