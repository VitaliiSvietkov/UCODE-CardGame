let id
var i = 0;
function time() {
  if (i == 0) {
    i = 1;
    var msec = 0;
    var elem = document.getElementById("myBar");
    let width = 100;
    id = setInterval(frame, 300); //300
    function frame() {
      msec += 300;
      if (width <= 0) {
        clearInterval(id);
        i = 0;

        let OponentInfo = JSON.parse(getCookie('OponentInfo'));
        let msg = {operation: "EndTurn", player: OponentInfo["OponentLogin"]};
        client.send(JSON.stringify(msg));
        
        turn++
        let cards = document.querySelectorAll("div.SteckC > div.card")
        if(turn % 2 == 0 && cards.length != 0) {
          take_card()
        }
        rotateCoin()
        time()
        document.getElementById("myBar").style.backgroundColor = "green";
      } else {
        if (msec > 20000) document.getElementById("myBar").style.backgroundColor = "orange";
        if (msec > 25000) document.getElementById("myBar").style.backgroundColor = "red";
        width--;
        elem.style.width = width + "%";
      }
    }
  }
}
function take_card() {
  if(turn > 1){
    let new_card = document.querySelector("div.SteckC > div.card")

    let start1 = Date.now(); // запомнить время начала
    let timer_1 = setInterval(function() {
    
      let timePassed1 = Date.now() - start1;
      if(timePassed1 < 300){
        new_card.style.left = timePassed1 / 6.3 + '%';
      }
      if (timePassed1 > 800) {
        clearInterval(timer_1);
        let start2 = Date.now(); // запомнить время начала
        let timer_2 = setInterval(function() {
          let timePassed2 = Date.now() - start2;
          if(timePassed2 < 300){
            new_card.style.top += (timePassed2 + 0.9) / 0.1 + '%';
          }
          if (timePassed2 > 300) {
            clearInterval(timer_2);
            let your_hand = document.getElementsByClassName("hand")[0]
            your_hand.append(new_card)
            new_card.style.removeProperty('left')
            new_card.style.removeProperty('top')
            

            let cards = document.querySelectorAll("div.hand > div.card")
            new_card.setAttribute("id", ''+cards.length)
            // time()
            // rotateCoin()
            document.getElementById("myBar").style.backgroundColor = "green";
            }
        }, 1)
      }
    }, 1)
  }
  
}