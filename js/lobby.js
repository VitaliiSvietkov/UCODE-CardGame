var host = getCookie('servHost');
var client = new WebSocket(`ws://${host}:8000`);

client.onmessage = function (e) {
    let msg = JSON.parse(e.data);
    document.getElementById('name').innerHTML = msg['name'];
    document.getElementById('wins').innerHTML = msg['win'];
    document.getElementById('loses').innerHTML = msg['lose'];
}

function getItems() {
    let arr = {operation: 'GETinfo', target: getCookie('user')};
    client.send(JSON.stringify(arr));
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

setTimeout(getItems, 200);
