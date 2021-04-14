var host = getCookie('servHost');
var client = new WebSocket(`ws://${host}:8000`);

setTimeout(() => {
  let msg = {operation: 'UpdateID', login: getCookie('user')};
  client.send(JSON.stringify(msg));
}, 150);

client.onmessage = function (e) {
  let msg = JSON.parse(e.data);
  switch (msg["operation"]) {
    case "BattleFinish":
      let OponentInfo = JSON.parse(getCookie('OponentInfo'));
      document.cookie = "OponentInfo=" + getCookie('OponentInfo') + "; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
      document.getElementById('finish').submit();
      break;
    default:
      break;
  }
}


class Hero {
  constructor() {
    this.health = 20;
  }
  take_damage(damage) {
    this.health -= damage;
  }
}

var player = new Hero();


function checkGame() {
  if (player.health <= 0 ) {
    //let OponentInfo = JSON.parse(getCookie('OponentInfo'));
    //document.cookie = "OponentInfo=" + getCookie('OponentInfo') + "; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    let OponentInfo = JSON.parse(getCookie('OponentInfo'));
    let msg = {operation: "BattleFinish", winner: OponentInfo['OponentLogin'], loser: getCookie('user')};
    client.send(JSON.stringify(msg));
    return false;
  }
  return false;
}
function surrender() {
  player.take_damage(20);
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}






function rotateCoin() {
  let coinFace = document.getElementById('coinFace');
  coinFace.style.transform = 'rotateX(1080deg)';

  let coinBack = document.getElementById('coinBack');

  // Create an effect of throwing a coin
  coinFace.style.width = '110px';
  coinFace.style.height = '110px';
  coinFace.style.right = '10px';

  coinBack.style.width = '110px';
  coinBack.style.height = '110px';
  setTimeout(() => {
    coinFace.style.width = '80px';
    coinFace.style.height = '80px';
    coinFace.style.right = '20px';
    coinBack.style.width = '80px';
    coinBack.style.height = '80px';
  }, 1000);

  // Backup to the initial state without animation
  setTimeout(() => {
    coinFace.style.transition = 'none';
    coinFace.style.transform = 'none';
  }, 2000);

  // Reset the animation
  setTimeout(() => {
    coinFace.style.transition = 'all 2s';
  }, 2100);
}
