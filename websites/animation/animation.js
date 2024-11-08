var score = 0;  
function move(event) {
    var cube = event.currentTarget;
    const ranx = Math.floor(Math.random()*(window.innerWidth-50));
    const rany = Math.floor(Math.random()*(window.innerHeight-50));
    cube.style.left = ranx + 'px';
    cube.style.top = rany + 'px';
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
    var code = "s" + score + "$" + c1.offsetLeft + "$" + c1.offsetTop + "$" + c2.offsetLeft + "$" + c2.offsetTop +"$"+ c3.offsetLeft + "$" + c3.offsetTop + "x";
    return code;
  }
  function getcode(){
    document.querySelector(".code").textContent=exp();
  }
  function decode(){
    var code = document.getElementById("code").value;
    console.log(code);
    const c1 = document.querySelector(".cube1");
    const c2 = document.querySelector(".cube2");
    const c3 = document.querySelector(".cube3");
    var score = Number(Number(code.substr(code.indexOf("s")+1,code.indexOf("$")-1)));
    document.querySelector('.score').textContent = score;
    c1.style.left = code.substr(code.indexOf("$",1)+1,code.indexOf("$",2)-1) + 'px';
    console.log(code.indexOf("$",(1*2)));
    console.log(code.indexOf("$",(2*2)));
    console.log(code.indexOf("$",3*2));
    console.log(code.indexOf("$",4*2));
    console.log(code.indexOf("$",5*2));
    console.log(code.indexOf("$",6*2));
    c1.style.top =  code.substr(code.indexOf("$",2)+1,code.indexOf("$",3)-1) + 'px';
    c2.style.left =  code.substr(code.indexOf("$",3)+1,code.indexOf("$",4)-1) + 'px';
    c2.style.top =  code.substr(code.indexOf("$",4)+1,code.indexOf("$",5)-1) + 'px';
    c3.style.left =  code.substr(code.indexOf("$",5)+1,code.indexOf("$",6)-1) + 'px';
    c3.style.top =  code.substr(code.indexOf("$",6)+1,code.indexOf("x")-1) + 'px';
  }

  function opensetings(event) {
    var cube = document.querySelector(".settings");
    cube.classList.toggle('active');
  }
  
  function Listenerss() {
    var cube = document.getElementById("sb"); 
    cube.addEventListener('click', opensetings);
    }
  getcode();
  Listeners();
  Listenerss();