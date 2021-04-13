<?php
  require __DIR__ . '/vendor/autoload.php';
  require_once(__DIR__ . "/models/connection/DatabaseConnection.php");
  require_once(__DIR__ . "/models/Blueprint.php");
  require_once(__DIR__ . "/view/View.php");
  require_once(__DIR__ . "/controller/Controller.php");

  session_start();

  //if (isset($_SESSION["error"]))
  //  unset($_SESSION["error"]);

  if (!isset($_SESSION["transition"]))
    $_SESSION["transition"] = "startscreen";
  
  if (!isset($_SESSION["controller"]))
    $_SESSION["controller"] = new Controller();

  $_SESSION["controller"]->transit();
  $_SESSION["controller"]->execute();

  /*if (isset($_SESSION["error"])) {
    echo "<script>
    transit('login', '" . $_SESSION["error"][1] . "');
    document.getElementById('perror').innerHTML = '" . $_SESSION["error"][0] . "';</script>";
  }*/
  