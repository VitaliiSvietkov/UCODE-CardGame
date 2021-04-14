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
    constructor(name, attack, defense, cost) {
        this.type = "Card";
        this.name = name;
        this.attack = attack;
        this.health = defense;
        this.cost = cost;

        this.path = "assets/images/Characters/" + name + ".png";
        this.element = document.createElement('div');
        this.element.className = 'card';
        this.element.style.backgroundImage = "url(\"" + this.path + "\")";
    }
    give_damage(target) {
        if (target.type === "Hero") {
            console.log(this.name);
            target.take_damage(this.attack);
            console.log(target.health);
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
