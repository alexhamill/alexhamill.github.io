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
    var str = "a$b$c$d$f"
    console.log(bindexOf(str, "$", 3));
    var code = document.getElementById("code").value;
    console.log(code);
    const c1 = document.querySelector(".cube1");
    const c2 = document.querySelector(".cube2");
    const c3 = document.querySelector(".cube3");
    var score = Number(Number(code.substr(code.indexOf("s")+1,code.indexOf("$")-1)));
    document.querySelector('.score').textContent = score;
    console.log(bindexOf(code,"$",6));
    c1.style.left = Number(code.substr(bindexOf(code,"$",1)+1,bindexOf(code,"$",2)-1)) + 'px';
    console.log("1:"+code.substr(bindexOf(code,"$",1)+1,bindexOf(code,"$",2)-1) + 'px');
    console.log(bindexOf(code,"$",1));
    console.log(bindexOf(code,"$",2));

    c1.style.top =  Number(code.substr(bindexOf(code,"$",2)+1,bindexOf(code,"$",3)-1)) + 'px';
    console.log("2:"+code.substr(bindexOf(code,"$",2)+1,bindexOf(code,"$",3)-1) + 'px');
    console.log(bindexOf(code,"$",2));
    console.log(bindexOf(code,"$",3));

    c2.style.left =  Number(code.substr(bindexOf(code,"$",3)+1,bindexOf(code,"$",4)-1)) + 'px';
    console.log("3:"+code.substr(bindexOf(code,"$",3)+1,bindexOf(code,"$",4)-1) + 'px');

    c2.style.top =  Number(code.substr(bindexOf(code,"$",4)+1,bindexOf(code,"$",5)-1)) + 'px';
    console.log("4:"+code.substr(bindexOf(code,"$",4)+1,bindexOf(code,"$",5)-1) + 'px');

    c3.style.left =  Number(code.substr(bindexOf(code,"$",5)+1,bindexOf(code,"$",6)-1)) + 'px';
    console.log("5:"+code.substr(bindexOf(code,"$",5)+1,bindexOf(code,"$",6)-1) + 'px');

    c3.style.top =  Number(code.substr(bindexOf(code,"$",6)+1,code.indexOf("x")-1)) + 'px';
    console.log("6:"+code.substr(bindexOf(code,"$",6)+1,code.indexOf("x")-1) + 'px');
    
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
  getcode();
  Listeners();
  Listenerss();