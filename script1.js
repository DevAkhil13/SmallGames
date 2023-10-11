const one = document.getElementById("1");
const two = document.getElementById("2");
const three = document.getElementById("3");
const four = document.getElementById("4");
const five = document.getElementById("5");
const six = document.getElementById("6");
const seven = document.getElementById("7");
const eight = document.getElementById("8");
const nine = document.getElementById("9");
const win = document.getElementById("win-stm");

const mode = document.getElementById("mode");
const play = document.getElementById("play-type");
const newgame = document.getElementById("new-game");
const blk = document.getElementsByClassName("blk");

let c = 1;
let flag = 1;
let i = "";
let ttoa = ["e", "e", "e", "e", "e", "e", "e", "e", "e"];
let play_typ = "2ply";

function clear() {
  for (j = 0; j < blk.length; j++) {
    blk[j].innerHTML = "";
  }
  for (j = 1; j < 10; j++) {
    ttoa[j] = "e";
  }
  win.innerHTML = "";
  flag = 1;
  c = 1;
}

newgame.onclick = function () {
  clear();
};

mode.onclick = function () {
  clear();
  if (play.innerHTML == "2 player mode") {
    play.innerHTML = "VS Bot";
    play_typ = "vbot";
  } else if (play.innerHTML == "VS Bot") {
    play.innerHTML = "2 player mode";
    play_typ = "2ply";
  }
};

function tto(x) {
  x.onclick = function () {
    if (!(x.innerHTML == "X" || x.innerHTML == "O") && flag) {
      i = x.id;
      if (play_typ == "2ply") {
        if (c % 2 == 0) {
          x.innerHTML = "O";
        } else {
          x.innerHTML = "X";
        }
        c = c + 1;
        check(i);
      } else {
        x.innerHTML = "X";
        c = c + 1;
        check(i);
        let s = bot(i);
        c = c + 1;
        check(s);
      }
    }
  };
}

function check3(x, y, z, ch) {
  if (ttoa[x] == ch && ttoa[y] == ch && ttoa[z] == "e") return z;
  else if (ttoa[x] == ch && ttoa[y] == "e" && ttoa[z] == ch) return y;
  else if (ttoa[x] == "e" && ttoa[y] == ch && ttoa[z] == ch) return x;
  else return 0;
}
function attack_defence(ch) {
  let a = [];
  a.push(check3(1, 2, 3, ch));
  a.push(check3(4, 5, 6, ch));
  a.push(check3(7, 8, 9, ch));
  a.push(check3(1, 4, 7, ch));
  a.push(check3(2, 5, 8, ch));
  a.push(check3(3, 6, 9, ch));
  a.push(check3(1, 5, 9, ch));
  a.push(check3(3, 5, 7, ch));
  return a;
}
function bot(pos) {
  pos = parseInt(pos);
  let f = pos;
  if (c == 2 && flag) {
    while (f == pos) {
      f = Math.floor(Math.random() * 9);
      if (f % 2 == 0) {
        f = f + 1;
      }
    }
    console.log(f);
  } else {
    let a = attack_defence("O");
    a = a.concat(attack_defence("X"));
    console.log(a);
    for (g = 0; g < a.length; g++) {
      if (a[g] != 0) {
        f = a[g];
        break;
      }
    }
    if (f == pos) {
      f = 1;
      while ((ttoa[f] == "X" || ttoa[f] == "O") && f <= 9) {
        f = f + 1;
      }
    }
  }
  console.log(f);
  console.log(ttoa);
  if (flag) {
    botmove(f);
  }
  return f;
}

function botmove(f) {
  let pos_id = "";
  pos_id = f.toString();
  console.log(pos_id);
  let bot_move = document.getElementById(pos_id);
  bot_move.innerHTML = "O";
}

function check(i) {
  let n = parseInt(i);
  if (c % 2 == 0) {
    ttoa[n] = "X";
  } else {
    ttoa[n] = "O";
  }
  if (check2(1, 2, 3) || check2(4, 5, 6) || check2(7, 8, 9)) {
    winn(c);
    console.log(1);
  } else if (check2(1, 4, 7) || check2(2, 5, 8) || check2(3, 6, 9)) {
    winn(c);
    console.log(2);
  } else if (check2(1, 5, 9) || check2(3, 5, 7)) {
    winn(c);
    console.log(3);
  } else if (c == 10) {
    winn(0);
    console.log(4);
  }
}

function check2(a, b, c) {
  if (
    (ttoa[a] == "X" && ttoa[b] == "X" && ttoa[c] == "X") ||
    (ttoa[a] == "O" && ttoa[b] == "O" && ttoa[c] == "O")
  ) {
    return true;
  } else {
    return false;
  }
}

function winn(r) {
  if (r == 0) {
    win.innerHTML = "It is an TIE";
  } else if (r % 2 == 0 && flag) {
    win.innerHTML = "Congratuations,Player 1 wins the match";
    flag = 0;
  } else if (flag) {
    if (play_typ == "vbot") {
      win.innerHTML = "The bot wins the match";
    } else {
      win.innerHTML = "Congratuations,Player 2 wins the match";
    }
    flag = 0;
  }
}

tto(one);
tto(two);
tto(three);
tto(four);
tto(five);
tto(six);
tto(seven);
tto(eight);
tto(nine);
