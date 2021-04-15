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
        this.element.className = 'card';
        this.element.style.backgroundImage = "url(\"" + this.path + "\")";

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
    }
    give_damage(target, mode) {
        if (target.type === "Hero") {
            console.log(this.name);
            target.take_damage(this.attack);
            console.log(target.health);
            if (mode !== 'silent')
              checkGame();
        }
        return;
    }
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
