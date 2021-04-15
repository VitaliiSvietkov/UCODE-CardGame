var enemy = new Hero();
var enemyField = new Array();
var enemyHand = new Array();
var enemyStones = 6;

var player = new Hero();
var playerDeck = new Array();
fillDeck(playerDeck);
var playerHand = new Array(); // Contains cards that player possess;
var playerField = new Array(); // Contains played cards
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
  let card = playerDeck.splice(index, 1);
  playerHand.push(card);
}
for (let i = 0; i < 7; ++i) {
  enemyHand.push(new Card('card_back'));
  document.getElementById('oponentHand').appendChild(enemyHand[i].element);
}
