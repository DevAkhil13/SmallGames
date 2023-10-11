const win = document.getElementById("win-stm");
const newgame = document.getElementById("new-game");
const cards = document.querySelectorAll('.blk');
const counter=document.getElementById('counter');

newgame.onclick = function () {
    location.reload()
};
  
let y=0;
let count=0;
let start=0;
let timeout;
let found = ["n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n","n"];
let symbols = ["&#127853","&#127969","&#128515","&#128640",
"&#129358","&#129322","&#128293","&#129304",
"&#127822","&#128118","&#127756","&#127750",
"&#127800","&#127794","&#128018","&#127969",
"&#128515","&#129322","&#128118","&#127756",
"&#127794","&#127853","&#128640","&#129358",
"&#128293","&#127750","&#127800","&#128018","&#129304","&#127822"];

function shuffle(){
    let r=Math.floor(Math.random()*12);
    let t=0;
    for (g=0;g<r;g++){
        t=symbols[0];
        for(j=0;j<29;j++){
            symbols[j]=symbols[j+1];
        }
        symbols[29]=t;
    }
    console.log(r);
}
shuffle()

function winstmt(){
    let u=1;
    for(i=0;i<30;i++){
        if(found[i]=="n"){
            u=0;
        }
    }
    if(u==1){
        var d="you have won with " + count + " moves"
        win.innerHTML=d;
    }
}
function mg(){
    let x=this
    x.style.backgroundColor = "white";
        if(found[x.id-1]=="n"){
            x.innerHTML = symbols[x.id-1];
            if(y==0 || y==x){
                y=x;
            }
            else if(y.innerHTML==x.innerHTML){
                found[x.id-1]="f";
                found[y.id-1]="f";
                y=0;
                count=count+1;
                 winstmt();
            }
            else if(y.innerHTML!=x.innerHTML){
                setTimeout(function(){
                    x.innerHTML="";  
                    x.style.backgroundColor = "black";
                    y.innerHTML="";
                    y.style.backgroundColor = "black";
                    y=0;
                },700);
                count=count+1;
            }
            counter.innerHTML="number of guesses : "+count;
        }
    }
cards.forEach(card => card.addEventListener('click',mg));   


