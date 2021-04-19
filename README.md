# <p align=center>UCODE-CardGame</p>
<p align=center>Implementation of a card game in a battle variation (Gwent and Hearthstone as references) using PHP/JavaScript/HTML/CSS/MySQL</p>
<p align=center><img src="https://web-creator.ru/uploads/Page/43/php.svg" width="300px" alt="PHP image"> <img src="https://miro.medium.com/max/1540/0*6e2K0U6ZkN9Ju9iL.jpg" width="300px" alt="JS image"> <img src="https://upload.wikimedia.org/wikipedia/ru/d/d3/Mysql.png" width="300px" alt="MySQL image"></p>

<h1> <p align=center>Important!</p> </h1>

You need to have already installed MySQL and PHP version that supports `pcntl_fork()` function, in another case you will not be able to run the server. Besides, server must be run on the hosting machine (this is due to the fact that connection to the WebsocketServer is done using the same IP ($_SERVER['SERVER_NAME']) as in the Hosting server). If you want to use project on different computers, they must be in the same local network.

<h1> <p align=center>How to use it?</p> </h1>

1. First of all, start the MySql server typing ```mysql.server restart``` command in your terminal.
2. Next, run the queries located in the ```db.sql``` file from the root directory in the ```mysql``` environment.
3. Open new terminal window and run the ```server.php``` file from the root directory of the project typing ```php server.php```.
4. Now you are ready to host the project - host the ```index.php``` file using ```PHP Server``` extension of ```VS Code``` or any other method (if you are going to connect from the other computer, do not forget to set your IPv4 in the ```PHP server``` extansion properties).
5. Open second incognito window, copy address from the previously opened tab. Now you are able to examine battle process.

<h1> <p align=center>Card explanation</p> </h1>

Each card has some attributes: attack, defense and its cost.
* The attack attribute, which is situated in the `left top corner` of the card, is the amount of damage that it will deal to the enemy or his/her card.
* Defense is "health" of the card and it is situated just under the attack icon. On the image it is empty, because it is set during the creation using JS to be able to reduce it after damage and display new value.
* Cost, as you can understand, is the value of card and is situated in the `top right corner`. What users will pay for cards will be explained later.
<p align="center"><img src="assets/images/Characters/Collapse.png" width="300px" height="450px"><img src="assets/images/Characters/card_back.png" width="300px" height="450px"></p>

<h1> <p align=center>Rules</p> </h1>

* To <b>find an oponent</b>, you need first to select your hero (I wanted to create some special abilities for them, but there was no time anymore to implement it, so this does not influence on anything) and click on the <b>START</b> button in the main menu. After this, you are moved to the searching room. If there already was someone, you immediately start a game with him. There are no visualization of searching process, but it is there, so if you click again on the <b>START</b> button you will be removed from the searching room.

<p align=center><img src="media/MainMenu.png" width="500px"></p>

* Your aim is to reduce your oponent's health to zero. When you are playing cards, they deal damage to <b>the most left</b> enemy's card or if there none of them, to the enemy himself. This is how the battlefield looks like.

<img src="media/Battle.png" width="400px"> <img src="media/ReducedHP.png">

* At the beginning of the game, the player has 6 "infinity stones" and 3 cards. Each card has a cost from 1 to 4 of infinity stones. You can play as many cards as you want until you have enough stones for it.

<p align=center><img src="media/Stones.png" width="600px">
<img src="media/Cards.png" width="600px"></p>

* If the coin has blue background, this is your turn to make a move. With red - your oponent's turn. At the beginning of player's turn, he/she will receive a new card. To skip a round players can click on the coin or wait 30 seconds (indicator will show how many time you have). If you want to end game (surrender) you can click on the "cross" image situated at your avatar which is on the left from the stones.

<p align=center><img src="media/Coin.png" height="284px"> <img src="media/Surrender.png"></p>

<h1> <p align=center>What could be done and improved?</p> </h1>

1. At the moment, it is barely impossible to win or lose without surrender as a result of disbalanced cards' price, attack and defense stats. To fix it, individual card abilities should be added, just like in GWENT or Hearthstone. This will give possibility to destroy enemy's cards faster and with less amount of your cards. In addition, the player should be able to choose, what card he/she wants to attack.
2. The game has no penalties for being "AFK", so when the time of round (30 sec) passes, the user that did not make a move should be somehow penaltied.
3. Data that user posseses is connected to the current connection to the server and as it is made at the beginning of the page load, if the user will decide to reload the page, the game will start again for him, but not for his enemy. This is the first thing that has to be fixed.
4. As you noticed, in the main menu you can select a hero (your avatar), but it does not give you some buffs, etc. The idea was to give each hero a special ability, like "Cards defense is increased by 1" or "You can play a random card from your deck". Just like in GWENT.
5. Players should be able to constuct their own decks, so a bigger amount of cards should be done. For this, special tabs in the menu, like "Deck constructor", should be implemented.
