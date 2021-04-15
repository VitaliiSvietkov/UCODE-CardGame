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
    case "playCard":
      document.getElementById('oponentHand').removeChild(document.getElementById('oponentHand').firstChild);
      let index = Math.floor(Math.random() * enemyHand.length - 1);
      if (index < 0) index = 0;
      enemyHand.splice(index, 1);
      enemyField.push(new Card(msg['card']));
      document.getElementById('oponentField').appendChild(enemyField[enemyField.length - 1].element);

      console.log(enemyField[enemyField.length - 1]);
      console.log(playerField[0]);
      console.log(playerField.length);

      if (playerField.length < 1)
        enemyField[enemyField.length - 1].give_damage(player, 'silent');
      else {
        enemyField[enemyField.length - 1].give_damage(playerField[0], 'silent');
      }
      break;
    default:
      break;
  }
}

var enemy = new Hero();
var enemyField = new Array();
var enemyHand = new Array();
var enemyStones = 6;

var player = new Hero();
var playerDeck = new Array();
fillDeck(playerDeck);
var playerHand = new Array(); // Contains cards that player possess;
var playerField = new Array(); // Contains played cards
for (let i = 0; i < playerDeck.length; ++i) {
  playerDeck[i].element.onclick = function(e) {
    let tmp = document.getElementById('playerHand').removeChild(e.target);
    document.getElementById('playerField').appendChild(tmp);
    tmp.onclick = null;
    for (let j = 0; j < playerHand.length; ++j) {
      if (playerHand[j][0].element === tmp) {
        let OponentInfo = JSON.parse(getCookie('OponentInfo'));
        playerField.push(playerHand.splice(j, 1)[0][0]);
        if (enemyField.length < 1)
          playerField[playerField.length - 1].give_damage(enemy, 'non-silent');
        else
          playerField[playerField.length - 1].give_damage(enemyField[0], 'non-silent');
        playedCard(playerField[playerField.length - 1].name, OponentInfo['OponentLogin'], client);
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
  if (enemy.health <= 0 ) {
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
}
for (let i = 0; i < 7; ++i) {
  enemyHand.push(new Card('card_back'));
  document.getElementById('oponentHand').appendChild(enemyHand[i].element);
}
