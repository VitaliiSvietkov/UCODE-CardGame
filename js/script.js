/*var host = getCookie('servHost');
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
}*/

var enemy = new Hero();
var enemyField = new Array();
var enemyStones = 6;

var player = new Hero();
var playerDeck = new Array(new Card('Avengers', 5, 6, 4), new Card('Battlefield', 2, 6, 3), new Card('BlackBolt', 2, 2, 1), new Card('BlackWidow', 4, 2, 2), new Card('CapitainAmerica', 4, 4, 2),
  new Card('Collapse', 6, 2, 3), new Card('Conflict', 6, 6, 4), new Card('DayWatch', 2, 2, 1), new Card('Defeat', 5, 2, 3), new Card('IronManWithStones', 6, 4, 4), new Card('Nightcrawler', 2, 1, 1),
  new Card('Rage', 5, 1, 2), new Card('Reborn', 4, 3, 3), new Card('Spider-man', 2, 2, 2), new Card('Thing', 2, 5, 3), new Card('Vision', 5, 5, 3), new Card('WarMachine', 6, 5, 3),
  new Card('WarOfTheRealms', 5, 4, 4), new Card('Wolverine', 3, 3, 2))
var playerHand = new Array(); // Contains cards that player possess;
var playerField = new Array(); // Contains played cards
for (let i = 0; i < playerDeck.length; ++i) {
  playerDeck[i].element.onclick = function(e) {
    let tmp = document.getElementById('playerHand').removeChild(e.target);
    document.getElementById('playerField').appendChild(tmp);
    tmp.onclick = null;
    for (let j = 0; j < playerHand.length; ++j) {
      if (playerHand[j][0].element === tmp) {
        playerField.push(playerHand.splice(j, 1)[0][0]);
        playerField[playerField.length - 1].give_damage(enemy);
        break;
      }
    }

  };
}
var playerStones = 6;

function checkGame() {
  if (player.health <= 0 ) {
    let OponentInfo = JSON.parse(getCookie('OponentInfo'));
    let msg = {operation: "BattleFinish", winner: OponentInfo['OponentLogin'], loser: getCookie('user')};
    client.send(JSON.stringify(msg));
    return false;
  }
  if (player.health <= 0 ) {
    let OponentInfo = JSON.parse(getCookie('OponentInfo'));
    let msg = {operation: "BattleFinish", winner: getCookie('user'), loser: OponentInfo['OponentLogin']};
    client.send(JSON.stringify(msg));
    return false;
  }
  return false;
}
function surrender() {
  player.take_damage(20);
}


for (let i = 0; i < 7; ++i) {
  let index = Math.floor(Math.random() * playerDeck.length - 1);
  if (index < 0) index = 0;
  document.getElementById('playerHand').appendChild(playerDeck[index].element);
  playerHand.push(playerDeck.splice(index, 1));
  console.log(playerHand.length);
}
