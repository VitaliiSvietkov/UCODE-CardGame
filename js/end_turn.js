function end_turn() {
    if(turn % 2 == 0){
        turn++
        rotateCoin()
        clearInterval(id)
        i = 0
        document.getElementById("myBar").style.width = "0%"
        setTimeout(function() {
            document.getElementById("myBar").style.width = "600px";
            time()
        }, 500)
        
    }
}