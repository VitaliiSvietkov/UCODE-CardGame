document.getElementById('ename').innerHTML = OponentInfo["OponentName"] + " (" + OponentInfo["OponentLogin"] + ")";
document.getElementById('ehp').innerHTML = "HP: 20/20";
document.getElementById('pname').innerHTML = PlayerInfo["PlayerName"] + " (" + PlayerInfo["PlayerLogin"] + ")";

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
    let msg = {operation: "BattleFinish", winner: OponentInfo['OponentLogin'], loser: PlayerInfo["PlayerLogin"]};
    client.send(JSON.stringify(msg));
    document.cookie = `user=${PlayerInfo['PlayerLogin']}; path=/; expires=0`;
    document.cookie = "PlayerInfo=" + JSON.stringify(PlayerInfo) + "; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    return false;
  }
  if (enemy.health <= 0 ) {
    let msg = {operation: "BattleFinish", winner: PlayerInfo["PlayerLogin"], loser: OponentInfo['OponentLogin']};
    client.send(JSON.stringify(msg));
    document.cookie = `user=${PlayerInfo['PlayerLogin']}; path=/; expires=0`;
    document.cookie = "PlayerInfo=" + JSON.stringify(PlayerInfo) + "; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
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

