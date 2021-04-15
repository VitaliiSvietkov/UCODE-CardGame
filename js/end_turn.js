function perform_end_turn() {
    if (turn % 2 == 0) {
        let OponentInfo = JSON.parse(getCookie('OponentInfo'));
        let msg = {operation: "EndTurn", player: OponentInfo["OponentLogin"]};
        client.send(JSON.stringify(msg));
        turn++;
        end_turn();
    }
}
function end_turn() {
    //if(turn % 2 == 0) {
        //turn++
        rotateCoin()
        clearInterval(id)
        i = 0
        document.getElementById("myBar").style.width = "0%"
        setTimeout(function() {
            document.getElementById("myBar").style.width = "600px";
            time()
        }, 500)
        
    //}
}