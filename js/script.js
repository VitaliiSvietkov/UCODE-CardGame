document.getElementById('ename').innerHTML = OponentInfo["OponentName"] + " (" + OponentInfo["OponentLogin"] + ")";
document.getElementById('ehp').innerHTML = "HP: 20/20";
document.getElementById('pname').innerHTML = PlayerInfo["PlayerName"] + " (" + PlayerInfo["PlayerLogin"] + ")";
document.getElementById('php').innerHTML = "HP: 20/20";

console.log(OponentInfo["avatar"]);

let enemy_avatar = document.getElementById('enemy');
if (OponentInfo["avatar"] === '0')
  enemy_avatar.src = 'assets/images/Thanos.gif';
else if (OponentInfo["avatar"] === '1')
  enemy_avatar.src = "assets/images/2.gif";
else
  enemy_avatar.src = 'assets/images/3.gif';

let player_avatar = document.getElementById('you');
if (PlayerInfo["PlayerHero"] === '0')
  player_avatar.src = 'assets/images/Thanos.gif';
else if (PlayerInfo["PlayerHero"] === '1')
  player_avatar.src = "assets/images/2.gif";
else
  player_avatar.src = 'assets/images/3.gif';
  

var Deck = new Array(new Card('card_back'));

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


for (let i = 0; i < 3; ++i) {
  let index = Math.floor(Math.random() * playerDeck.length - 1);
  if (index < 0) index = 0;
  document.getElementById('playerHand').appendChild(playerDeck[index].element);
  let card = playerDeck.splice(index, 1);
  playerHand.push(card);
}
document.getElementsByClassName("hand")[0].style.left = "calc(50% - " + (playerHand.length - 1) + "*(150px+5)/2)";
for (let i = 0; i < 3; ++i) {
  enemyHand.push(new Card('card_back'));
  document.getElementById('oponentHand').appendChild(enemyHand[i].element);
}
document.getElementsByClassName('SteckC')[0].appendChild(Deck[0].element);
document.getElementsByClassName("handUp")[0].style.left = "calc(50% - " + (enemyHand.length - 1) + "*(150px+5)/2)";



