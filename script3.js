
const newgame = document.getElementById("new-game");
const cl1 = document.getElementById("clue1");
const cl2 = document.getElementById("clue2");
const win= document.getElementById("win-stm");
const mword=document.getElementById("mainword");
const letters = document.querySelectorAll('.blk');
const prt = document.querySelectorAll('.pt');
const faceexp=document.getElementById('faceexpression');
const next=document.getElementById("nxt");
const p1 = document.getElementById("part1");
const p2 = document.getElementById("part2");
const p3 = document.getElementById("part3");
const p4 = document.getElementById("part4");
const p5 = document.getElementById("part5");
const p6 = document.getElementById("part6");
const p7 = document.getElementById("part7");
const p8 = document.getElementById("part8");

let countriescount=0;
let animalscount=0;
let mistakes=0;
let topic="";
let hmword="";
let filngwrd="";
let completed=0;
let score=0;
newgame.onclick = function () {
    location.reload()
    start();
};
next.onclick =function(){
    if(topic=="animals"){
        animalscount=animalscount+1;
    }
    else if(topic=="countries"){
    countriescount=countriescount+1;
    }
    clear();
    start();
}
function clear(){
    for(i=0;i<letters.length;i++){
        letters[i].style.backgroundColor="black";
        letters[i].style.color="white";
    }
    for(i=0;i<prt.length;i++){
        prt[i].style.backgroundColor="white";
    }
    cl1.innerHTML="1) -";
    cl2.innerHTML="2) want an another clue?"
    win.innerHTML="";
    faceexp.innerHTML="&#128534";
    next.innerHTML="skip ->";
    mistakes=0;
}
function endgame(){
    win.innerHTML="the man died!";
    faceexp.innerHTML="&#128565";
    next.innerHTML="next ->";
    mword.innerHTML=hmword;
}
cl2.onclick =function(){
    if(topic=="animals"){
        cl2.innerHTML="2) "+animalsclues[animalscount];
    }
    else{
        cl2.innerHTML="2) "+countriesclues[countriescount];
    }
}

let countries = ["INDIA","NEPAL","RUSSIA","SPAIN","PAKISTAN","AMERICA","BRAZIL","FRANCE","ARGENTINA"];
let animals=["DOG","LION","TIGER","WHALE","RHINO","GIRAFFE","LEOPARD","EAGLE","CROCODILE"];
let animalsclues=[
    "faithful animal",
    "king of the jungle",
    "striped predator",
    "huge mammal",
    "horned animal",
    "long neck",
    "dotted skin",
    "national animal of us",
    "lake predator"
]
let countriesclues=[
    "land of various cultures",
    "highest mountain peak loacted here",
    "one is usa other is ...",
    "capital:madrid",
    "green flag with white crescent",
    "statue of liberty",
    "loves football,pele played for this country",
    "eiffle tower",
    "capital:buneous aires"
]

function start(){
    if(countriescount==9 && animalscount==9)
    {
        win.innerHTML="you have completed all words,your score: "+score+"/18";
        next.innerHTML="";
        cl2.innerHTML="2) -"
        mword.innerHTML="All words completed";
        faceexp.innerHTML="&#128513"
        completed=1;

    }
    else if(countriescount>animalscount){
        cl1.innerHTML="1) name of an animal";
        topic="animals";
        hmword=animals[animalscount];
       
    }
    else if(countriescount==animalscount){
        cl1.innerHTML="1) name of an country";
        topic="countries";
        hmword=countries[countriescount];
       
    }

    if(completed==0){
    let emptyword ="";
    for(i=0;i<hmword.length;i++){
        emptyword=emptyword+"-";
    }
    mword.innerHTML=emptyword;
    filngwrd=emptyword;
    }
}
function replace(r){
    let a=0;
    let b="";
    for(i=0;i<hmword.length;i++){
        if(filngwrd[i]!="-"){
            b=b+filngwrd[i];
        }
        else if(hmword[i]==r ){
          a=1;
          b=b+r;  
        }   
        else{
           b=b+"-";
        }
    }
    mword.innerHTML=b;
    filngwrd=b;
    return(a);
}

function hangman(){
    if(completed==0){
    let x=this;
    x.style.backgroundColor="white";
    x.style.color="black";
    if(replace(x.id)){
        if(filngwrd==hmword){
            win.innerHTML="the man survived!";
            faceexp.innerHTML="&#128517"
            next.innerHTML="next ->";
            score=score+1;
        }
    }
    else{
        if(mistakes==0){
            p1.style.backgroundColor="black";
            mistakes=mistakes+1;
        }
        else if(mistakes==1){
            p2.style.backgroundColor="black";
            mistakes=mistakes+1;
        }
        else if(mistakes==2){
            p3.style.backgroundColor="black";
            mistakes=mistakes+1;
        }
        else if(mistakes==3){
            p4.style.backgroundColor="black";
            mistakes=mistakes+1;
        }
        else if(mistakes==4){
            p5.style.backgroundColor="black";
            mistakes=mistakes+1;
        }
        else if(mistakes==5){
            p6.style.backgroundColor="black";
            mistakes=mistakes+1;
        }
        else if(mistakes==6){
            p7.style.backgroundColor="black";
            mistakes=mistakes+1;
        }
        else if(mistakes==7){
            p8.style.backgroundColor="black";
            mistakes=mistakes+1;
            endgame(hmword);
        }
        
    }
}
}
start();
letters.forEach(letter => letter.addEventListener('click',hangman));   


