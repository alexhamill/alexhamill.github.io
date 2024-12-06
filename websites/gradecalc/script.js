function createbracket(name){
    const brackets = document.getElementById("brackets");
    const brackercontainer = document.createElement("div");
    brackercontainer.id = name;
    brackets.appendChild(brackercontainer);
    const title = document.createElement("h3")
    title.textContent = name + ":";
    brackercontainer.appendChild(title);
    const newrowbutton = document.createElement("button");
    const groupweighttext = document.createElement("span");
    groupweighttext.textContent = "group weigh : ";
    const groupweightinput = document.createElement("input");
    groupweightinput.id = name + "weight";
    groupweightinput.placeholder = "group weight";
    brackercontainer.appendChild(groupweighttext);
    brackercontainer.appendChild(groupweightinput);
    brackercontainer.appendChild(newrowbutton);
    newrowbutton.textContent = "add new row";
    newrowbutton.style.display = "block";
    newrowbutton.style.marginTop = "10px";
    newrowbutton.classList.add(name);
    newrowbutton.addEventListener("click", addrow);
    const inputtable = document.createElement("table");
    brackercontainer.appendChild(inputtable);
    inputtable.id = name + "table"
    inputtable.appendChild(createrow(name));
    
}

function createrow(group){
    const row = document.createElement("tr");
    const namecol = document.createElement("td");
    row.appendChild(namecol);
    const nameinput = document.createElement("input");
    namecol.appendChild(nameinput);
    nameinput.placeholder = "assinment name";
    const scorecol = document.createElement("td");
    row.appendChild(scorecol);
    const scoreinput = document.createElement("input");
    scorecol.appendChild(scoreinput);
    scoreinput.placeholder = "points you got";
    scoreinput.classList.add(group+"score")
    const maxptcol = document.createElement("td");
    row.appendChild(maxptcol);
    const maxptinput = document.createElement("input");
    maxptcol.appendChild(maxptinput);
    maxptinput.classList.add(group+"maxpt")
    maxptinput.placeholder = "max points"
    return row;
}



function addrow(event){
    const button = event.currentTarget;
    const table = document.getElementById(button.classList+"table");
    table.appendChild(createrow(button.classList));
}

function startup(){
    const brackets = document.getElementById("brackets");
    const groupname = document.createElement("input");
    const makegroupbutton = document.createElement("button");
    groupname.placeholder = "group name";
    groupname.id = "makegroupbutton"
    brackets.appendChild(groupname);
    brackets.appendChild(makegroupbutton);
    makegroupbutton.textContent = "make new grade bracket"
    makegroupbutton.addEventListener("click",getname);
    const calculatebutton = document.createElement("button");
    calculatebutton.textContent = "calculate grade";
    document.querySelector("footer").appendChild(calculatebutton);
    calculatebutton.addEventListener("click",calculategrade);
}

function getname(){
    const input = document.getElementById("makegroupbutton").value;
    if(input === ""){return 0;}
    createbracket(input);
    document.getElementById("makegroupbutton").value = "";
}
function calculategrade(){
    let adding = 0;
    let realfinalgrade = 0;
    let finalgrade = [];
    let allgrade = [];
    let allmaxpt = [];
    let percent = [];
    const brackets = document.getElementById("brackets");
    let allgroups = brackets.querySelectorAll("div");
    allgroups.forEach(div => {
        let allinput = div.querySelectorAll("."+div.id + "score");
        allinput.forEach(input =>{
            adding = adding + Number(input.value); 
        });
        allgrade.push(adding);
        adding = 0;
      });
    console.log(allgrade);

    allgroups.forEach(div => {
        let allinput = div.querySelectorAll("."+div.id + "maxpt");
        allinput.forEach(input =>{
            adding = adding + Number(input.value); 
        });
        allmaxpt.push(adding);
        adding = 0;
        percent.push(Number(document.getElementById(div.id+"weight").value)*0.01);
      });
    console.log(allmaxpt);
    let i = 0;
    allmaxpt.forEach(maxpt =>{
        finalgrade.push(allgrade[i]/maxpt);
        i++;
    });
    console.log(finalgrade);
    let x = 0;
    percent.forEach(num =>{
        console.log(finalgrade[x]);
        console.log(finalgrade);
        console.log(percent);
        realfinalgrade = realfinalgrade + (finalgrade[x] * num);
        x++;
    });
    realfinalgrade = realfinalgrade *100;
    document.getElementById("results").textContent = realfinalgrade;
}
startup();
