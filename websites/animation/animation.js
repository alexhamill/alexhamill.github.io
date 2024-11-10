let clicker = 0; 
let score = 0;
function move(event) {
    let cube = event.currentTarget;
    const ranx = Math.floor(Math.random()*(window.innerWidth-50));
    const rany = Math.floor(Math.random()*(window.innerHeight-50));
    cube.style.left = ranx + 'px';
    cube.style.top = rany + 'px';
    cube.classList.add('active');
    score += 1;
    document.querySelector('.score').textContent = score;
    getcode();
  }

  
  
  function Listeners() {
    let cubes = document.querySelectorAll('.cube'); 
    cubes.forEach(function(cube) {
      cube.addEventListener('mouseenter', move);
    });
    
  }
  function exp(){
    const c1 = document.querySelector(".cube1");
    const c2 = document.querySelector(".cube2");
    const c3 = document.querySelector(".cube3");
    let code = "s" + score + "$" + c1.style.left + "$" + c1.style.top + "$" + c2.style.left + "$" + c2.style.top +"$"+ c3.style.left + "$" + c3.style.top + "x";
    code = code.replaceAll('px',"");
    return code;
  }
  function getcode(){
    document.getElementById("displaycode").textContent=exp();
  }
  function decode(){
    let code = document.getElementById("code").value;
    console.log(code);
    const c1 = document.querySelector(".cube1");
    const c2 = document.querySelector(".cube2");
    const c3 = document.querySelector(".cube3");
    c1.classList.add('active');
    c2.classList.add('active');
    c3.classList.add('active');
    score = Number(code.substring(code.indexOf("s")+1,code.indexOf("$")));
    document.querySelector('.score').textContent = score;
    
    c1.style.left = Number(code.substring(bindexOf(code,"$",1)+1,bindexOf(code,"$",2))) + 'px';


    c1.style.top =  Number(code.substring(bindexOf(code,"$",2)+1,bindexOf(code,"$",3))) + 'px';


    c2.style.left =  Number(code.substring(bindexOf(code,"$",3)+1,bindexOf(code,"$",4))) + 'px';

    c2.style.top =  Number(code.substring(bindexOf(code,"$",4)+1,bindexOf(code,"$",5))) + 'px';


    c3.style.left =  Number(code.substring(bindexOf(code,"$",5)+1,bindexOf(code,"$",6))) + 'px';


    c3.style.top =  Number(code.substring(bindexOf(code,"$",6)+1,code.indexOf("x"))) + 'px';
   
    
  }

  function opensetings() {
    let cube = document.querySelector(".settings");
    cube.classList.toggle('active');
  }
  function openshop(){
    
    document.getElementById("storecontainer").classList.toggle("active");
  }
  function bindexOf(str,s,n){
    let curentpos = -1;
    for (let i=0; i<n;i++){
      curentpos = str.indexOf(s,curentpos+1);
      if (curentpos === -1){
        break;
      }
    }
    return curentpos;
  }
  
  function Listenerss() {
    let sb = document.getElementById("sb"); 
    sb.addEventListener('click', opensetings);
    let shopbutton = document.getElementById("storebutton");
    shopbutton.addEventListener('click',openshop);
    }

  function copytext(){
    navigator.clipboard.writeText(document.getElementById("displaycode").textContent);
  }
  function addclicker(){
    if (score >= 15){
      clicker += 1;
      score -= 15;
    }
  }
  getcode();
  Listeners();
  Listenerss();