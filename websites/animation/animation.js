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
  function decode(code){
    const c1 = document.querySelector(".cube1");
    const c2 = document.querySelector(".cube2");
    const c3 = document.querySelector(".cube3");
    var score = Number(Number(str.substr(str.indexOf("s")+1,str.indexOf("$")-1)));
    document.querySelector('.score').textContent = score;
    c1.style.left = code.substr(code.indexOf("$",1)+1,code.indexOf("$",2)-1) + 'px';
    c1.style.top =  code.substr(code.indexOf("$",2)+1,code.indexOf("$",3)-1) + 'px';
    c2.style.left =  code.substr(code.indexOf("$",3)+1,code.indexOf("$",4)-1) + 'px';
    c2.style.top =  code.substr(code.indexOf("$",4)+1,code.indexOf("$",5)-1) + 'px';
    c3.style.left =  code.substr(code.indexOf("$",5)+1,code.indexOf("$",6)-1) + 'px';
    c3.style.top =  code.substr(code.indexOf("$",6)+1,code.indexOf("x")-1) + 'px';
  }
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

  function opensetings(event) {
    var cube = event.currentTarget;
    cube.classList.toggle('active');
  }
  
  function Listenerss() {
    var cubes = document.querySelectorAll('.settings'); 
    cubes.forEach(function(cube) {
      cube.addEventListener('mouseenter', opensetings);
    });}
  getcode();
  Listeners();
  Listenerss();