var backgroundPreload = new Array();
backgroundPreload[0] = "/assets/images/Background/Back1.jpg";
backgroundPreload[1] = "/assets/images/Background/Back2.jpg";
backgroundPreload[2] = "/assets/images/Background/Back3.jpg";
backgroundPreload[3] = "/assets/images/Background/Back4.jpg";
backgroundPreload[4] = "/assets/images/Background/Back5.jpg";
var backgroundLoaded = new Array();
for (var i = 0; i < backgroundPreload.length; ++i) {
  backgroundLoaded[i] = new Image();
  backgroundLoaded[i].src = backgroundPreload[i];
}
