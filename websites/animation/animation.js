let clicker = 0; 
let score = 0;
let activeclickers = 0;
let multi = 1;
function move(event) {
    let cube = event.currentTarget;
    const ranx = Math.floor(Math.random()*(window.innerWidth-50));
    const rany = Math.floor(Math.random()*(window.innerHeight-50));
    cube.style.left = ranx + 'px';
    cube.style.top = rany + 'px';
    cube.classList.add('active');
    score += 1*multi;
    document.querySelector('.score').textContent = Math.round(score*10)/10;
    getcode();
  }
  function mover(cub) {
    let cube = cub;
    const ranx = Math.floor(Math.random()*(window.innerWidth-50));
    const rany = Math.floor(Math.random()*(window.innerHeight-50));
    cube.style.left = ranx + 'px';
    cube.style.top = rany + 'px';
    cube.classList.add('active');
    score += 1*multi;
    document.querySelector('.score').textContent = Math.round(score*10)/10;
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
    let code = "s" + Math.round(score) + "$" + c1.style.left + "$" + c1.style.top + "$" + c2.style.left + "$" + c2.style.top +"$"+ c3.style.left + "$" + c3.style.top + "$"+activeclickers+"$"+multi+"x";
    code = code.replaceAll('px',"");
    return code;
  }
  function getcode(){
    document.getElementById("displaycode").textContent=exp();
  }
  function decode(){
    let code = document.getElementById("code").value;
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


    c3.style.top =  Number(code.substring(bindexOf(code,"$",6)+1,bindexOf(code,"$",7))) + 'px';
   
    uninitclickers = Number(code.substring(bindexOf(code,"$",7)+1,bindexOf(code,"$",8)));
    for (let i=activeclickers;i<uninitclickers;i++){
      Makeclicker();
    }
    multi = Number(code.substring(bindexOf(code,"$",8)+1,code.indexOf("x")));
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
        return -1;
      }
    }
    return curentpos;
  }
  
  function Listenerss() {
    let sb = document.getElementById("sb"); 
    sb.addEventListener('click', opensetings);
    let shopbutton = document.getElementById("storebutton");
    shopbutton.addEventListener('click',openshop);
    let newsbutton= document.getElementById("newsbutton");
    newsbutton.addEventListener('click',opennews)
    }
    function opennews(event){
      newscontainer = document.getElementById("newscontainer");
      newscontainer.classList.toggle("active");
    }
  function copytext(){
    getcode();
    navigator.clipboard.writeText(document.getElementById("displaycode").textContent);
  }
  function addclicker(){
    if (score >= 15){
      clicker += 1;
      score -= 15;
      document.querySelector('.score').textContent = Math.round(score*10)/10;
      Makeclicker();
    }
    
  }
  function Makeclicker(){
    const clicker = document.createElement("div");
    clicker.className = "clickers";
    activeclickers += 1;
    
    const a = "clicker" + activeclickers;
    clicker.id=a;
    document.body.appendChild(clicker);
    moveclicker(clicker);
  }
  function moveclicker(curclicker){
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    const box = ".cube"+randomNumber;
    let curcube = document.querySelector(box);
    curclicker.style.left = curcube.style.left;
    curclicker.style.top = curcube.style.top;
    setTimeout(() => {
      mover(curcube);
      setTimeout(() => {
        moveclicker(curclicker);
      }, 2000); 
    }, 2000); 
    
  }
    function upmulti(){
      if (score >= 15){
        clicker += 1;
        score -= 15;
        document.querySelector('.score').textContent = Math.round(score*10)/10;
        multiup();
      }
    }
    function multiup(){
      multi += 0.1;
    }
  getcode();
  Listeners();
  Listenerss();