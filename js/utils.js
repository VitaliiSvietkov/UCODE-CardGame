var host = getCookie('servHost');
var client = new WebSocket(`ws://${host}:8000`);

setTimeout(() => {
  let msg = {operation: 'UpdateID', login: getCookie('user')};
  client.send(JSON.stringify(msg));
}, 150);

function ReduceStones(card, stones, id) {
  if (id === 'stone2') {
    playerStones -= card.cost;
    stones = playerStones;
  }
  else {
    enemyStones -= card.cost;
    stones = enemyStones;
  }
  let children = document.getElementById(id).children;
  for (let i = stones; i < 6; ++i) {
      children[i].className = "DeStone";
  }
}

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
      document.getElementsByClassName("handUp")[0].style.left = "calc(50% - " + enemyHand.length + "*(150px+5)/2)";
      document.getElementsByClassName("handUp2")[0].style.left = "calc(50% - " + enemyField.length + "*(150px+5)/2)";
      ReduceStones(enemyField[enemyField.length - 1], enemyStones, 'stone1');

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

class Hero {
    constructor() {
      this.health = 20;
      this.type = "Hero";
    }
    take_damage(damage) {
      this.health -= damage;
    }
}

class Card {
    constructor(name) {
        this.type = "Card";
        this.name = name;

        this.path = "assets/images/Characters/" + name + ".png";
        this.element = document.createElement('div');

        switch (name) {
          case 'Avengers':
            this.attack = 5;
            this.health = 6;
            this.cost = 4;
            break;
          case 'Battlefield':
            this.attack = 2;
            this.health = 6;
            this.cost = 3;
            break;
          case 'BlackBolt':
            this.attack = 2;
            this.health = 2;
            this.cost = 1;
            break;
          case 'BlackWidow':
            this.attack = 4;
            this.health = 2;
            this.cost = 2;
            break;
          case 'CapitainAmerica':
            this.attack = 4;
            this.health = 4;
            this.cost = 2;
            break;
          case 'Collapse':
            this.attack = 6;
            this.health = 2;
            this.cost = 3;
            break;
          case 'Conflict':
            this.attack = 6;
            this.health = 6;
            this.cost = 4;
            break;
          case 'DayWatch':
            this.attack = 2;
            this.health = 2;
            this.cost = 1;
            break;
          case 'Defeat':
            this.attack = 5;
            this.health = 2;
            this.cost = 3;
            break;
          case 'IronManWithStones':
            this.attack = 6;
            this.health = 4;
            this.cost = 4;
            break;
          case 'Nightcrawler':
            this.attack = 2;
            this.health = 1;
            this.cost = 1;
            break;
          case 'Rage':
            this.attack = 5;
            this.health = 1;
            this.cost = 2;
            break;
          case 'Reborn':
            this.attack = 4;
            this.health = 3;
            this.cost = 3;
            break;
          case 'Spider-man':
            this.attack = 2;
            this.health = 2;
            this.cost = 2;
            break;
          case 'Thing':
            this.attack = 2;
            this.health = 5;
            this.cost = 3;
            break;
          case 'Vision':
            this.attack = 5;
            this.health = 5;
            this.cost = 3;
            break;
          case 'WarMachine':
            this.attack = 6;
            this.health = 5;
            this.cost = 3;
            break;
          case 'WarOfTheRealms':
            this.attack = 5;
            this.health = 4;
            this.cost = 4;
            break;
          case 'Wolverine':
            this.attack = 3;
            this.health = 3;
            this.cost = 2;
            break;
          case 'card_back':
            this.attack = 0;
            this.health = 0;
            this.cost = 0;
            break;
        }
        if (name !== 'card_back') {
          let defense = document.createElement('div');
          defense.id = 'num';
          defense.innerHTML = this.health;
          this.element.appendChild(defense);
        }
        this.element.className = 'card';
        this.element.style.backgroundImage = "url(\"" + this.path + "\")";
    }
    give_damage(target, mode) {
      target.take_damage(this.attack);
      if (target.type === "Hero") {
          if (mode !== 'silent')
            checkGame();
      }
      return;
    }
    take_damage(damage) {
      this.health -= damage;
      if (this.health <= 0) {
        let parent = this.element.parentNode;
        parent.removeChild(this.element);
        if (parent.id === 'playerField') {
          for (let i = 0; i < playerField.length; ++i) {
            if (playerField[i].element === this.element)
              playerField.splice(i, 1);
          }
        }
        else {
          for (let i = 0; i < enemyField.length; ++i) {
            if (enemyField[i].element === this.element)
              enemyField.splice(i, 1);
          }
        }
      }
      else {
        this.element.children[0].innerHTML = this.health;
      }
    }
}

function rotateCoin() {
  let coinFace = document.getElementById('coinFace');
  coinFace.style.transform = 'rotateX(' + ((turn*5)*180) + 'deg)';
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


  // Reset the animation
  setTimeout(() => {
    coinFace.style.transition = 'all 2s';
  }, 2100);
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

function fillDeck(deck) {
  deck.push(new Card('Avengers'));
  deck.push(new Card('Battlefield'));
  deck.push(new Card('BlackBolt'));
  deck.push(new Card('BlackWidow'));
  deck.push(new Card('CapitainAmerica'));
  deck.push(new Card('Collapse'));
  deck.push(new Card('Conflict'));
  deck.push(new Card('DayWatch'));
  deck.push(new Card('Defeat'));
  deck.push(new Card('IronManWithStones'));
  deck.push(new Card('Nightcrawler'));
  deck.push(new Card('Rage'));
  deck.push(new Card('Reborn'));
  deck.push(new Card('Spider-man'));
  deck.push(new Card('Thing'));
  deck.push(new Card('Vision'));
  deck.push(new Card('WarMachine'));
  deck.push(new Card('WarOfTheRealms'));
  deck.push(new Card('Wolverine'));
}

function playedCard(name, player, socket) {
  let msg = {operation: 'playCard', player: player, card: name};
  socket.send(JSON.stringify(msg));
}
