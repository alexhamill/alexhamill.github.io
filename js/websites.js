// script wide vars
let websites = ["oldwebsite", "gradecalc"];
let curslide = -1;
let ready = true;


//  listeners
function Listeners() {
    let cubes = document.getElementById('arrow');
    cubes.addEventListener('click', scroll);
}


// scrolling websites code
function scroll(){
    if(!ready){
        return;
    }
    ready = false;
    console.log('scrolling');
    curslide++;
    if(curslide>=websites.length){
        curslide = 0;
    }
    let div = createDiv();
    setTimeout(() => moveDiv(),50);
    setTimeout(() => deleteold(),3100);
}

function moveDiv(){
    newdiv = document.getElementById('div'+(curslide));
    newdiv.style.top = '15%';
    if (curslide>0){
        lastdiv = document.getElementById('div'+(curslide-1));
        lastdiv.style.top = '300%';
    }
    if(curslide==0){
        lastdiv = document.getElementById('div'+(websites.length-1));
        lastdiv.style.top = '300%';
    }
}

function createDiv(){
    let div = document.createElement('div');
    div.id = 'div'+curslide;
    let iframe = document.createElement('iframe');
    iframe.src = 'websites/'+websites[curslide]+"/index.html";
    let a = document.createElement('a');
    a.href = 'websites/'+websites[curslide]+"/index.html";
    a.innerHTML = websites[curslide];
    div.classList.add('div');
    iframe.classList.add('shadow');
    document.body.appendChild(div);
    div.appendChild(a);
    div.appendChild(iframe);
    
    a.classList.add('link');
    div.style.position = 'absolute';
    div.style.width = '50%';
    div.style.height = '50%';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    div.style.top = '-70%';
    div.style.left = '25%';
    iframe.style.backgroundColor = 'white';
    div.style.transition = "all 3s ease";
    return div;
}

function deleteold(){
    
    if(curslide>0){
        if(document.getElementById('div'+(curslide-1))==null){
            ready = true;
            return;
        }
        let olddiv = document.getElementById('div'+(curslide-1));
        olddiv.remove();
    }
    if(curslide==0){
        if(document.getElementById('div'+(websites.length-1))==null){
            ready = true;
            return;
        }
        let olddiv = document.getElementById('div'+(websites.length-1));
        olddiv.remove();
    }
    
    ready = true;
}


// starting functions
Listeners();