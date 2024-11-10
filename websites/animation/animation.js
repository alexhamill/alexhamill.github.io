 
function move(event) {
    var cube = event.currentTarget;
    const ranx = Math.floor(Math.random()*(window.innerWidth-50));
    const rany = Math.floor(Math.random()*(window.innerHeight-50));
    cube.style.left = ranx + 'px';
    cube.style.top = rany + 'px';
    cube.classList.add('active');
    document.querySelector('.score').textContent = score = Number(document.querySelector('.score').textContent) + 1;
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
    var code = "s" + document.querySelector('.score').textContent + "$" + c1.style.left + "$" + c1.style.top + "$" + c2.style.left + "$" + c2.style.top +"$"+ c3.style.left + "$" + c3.style.top + "x";
    code = code.replaceAll('px',"");
    return code;
  }
  function getcode(){
    document.getElementById("displaycode").textContent=exp();
  }
  function decode(){
    var str = "a$b$c$d$f"
    console.log(bindexOf(str, "$", 3));
    var code = document.getElementById("code").value;
    console.log(code);
    const c1 = document.querySelector(".cube1");
    const c2 = document.querySelector(".cube2");
    const c3 = document.querySelector(".cube3");
    c1.classList.add('active');
    c2.classList.add('active');
    c3.classList.add('active');
    var score = Number(code.substring(code.indexOf("s")+1,code.indexOf("$")));
    document.querySelector('.score').textContent = score;
    
    c1.style.left = Number(code.substring(bindexOf(code,"$",1)+1,bindexOf(code,"$",2))) + 'px';


    c1.style.top =  Number(code.substring(bindexOf(code,"$",2)+1,bindexOf(code,"$",3))) + 'px';


    c2.style.left =  Number(code.substring(bindexOf(code,"$",3)+1,bindexOf(code,"$",4))) + 'px';

    c2.style.top =  Number(code.substring(bindexOf(code,"$",4)+1,bindexOf(code,"$",5))) + 'px';


    c3.style.left =  Number(code.substring(bindexOf(code,"$",5)+1,bindexOf(code,"$",6))) + 'px';


    c3.style.top =  Number(code.substring(bindexOf(code,"$",6)+1,code.indexOf("x"))) + 'px';
   
    
  }

  function opensetings(event) {
    var cube = document.querySelector(".settings");
    cube.classList.toggle('active');
  }
  function bindexOf(str,s,n){
    var curentpos = -1;
    for (let i=0; i<n;i++){
      curentpos = str.indexOf(s,curentpos+1);
      if (curentpos === -1){
        break;
      }
    }
    return curentpos;
  }
  
  function Listenerss() {
    var cube = document.getElementById("sb"); 
    cube.addEventListener('click', opensetings);
    }

  function copytext(){
    navigator.clipboard.write(document.getElementById("copybutton").textContent);
  }
  getcode();
  Listeners();
  Listenerss();