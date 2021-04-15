let body = document.getElementsByClassName("hand")[0]
let check_fst = true
let check_scnd = true
body.onclick = function(event) {
    if(event.target.classList.contains("card") && !event.target.classList.contains("on_battle") && turn%2 == 0) {
        console.log(document.getElementById(event.target.id))
        event.target.style.position = "relative"
        // let cords = event.target.getBoundingClientRect()
        event.target.classList.add("on_battle")
        let start1 = Date.now(); // запомнить время начала


        let timer_1 = setInterval(function() {
        
            
            let timePassed1 = Date.now() - start1;
            if(timePassed1 <= 500){
                draw_top(timePassed1);
            }
            if (timePassed1 >= 750) {
                clearInterval(timer_1);
                let table_aly = document.getElementById("playerField")
                table_aly.append(event.target)
                event.target.style.width = "125px"
                event.target.style.height = "181.25px"
                // let cards = document.querySelectorAll("div.hand > div.card")
                // for(let i = 0; cards[i] != null; i++){
                //     let j = i+1
                //     cards[i].removeAttribute("id")
                //     cards[i].setAttribute("id", ''+j)
                // }

                let indent = playerHand.length + 28.5
                document.getElementsByClassName("hand")[0].style.right = "calc(50% - " + indent + "em)";

                tmp = event.target;
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
            }
        }, 1);
        function draw_top(timePassed) {
            event.target.style.bottom = timePassed / 3.5 + '%';
        }
    }
}