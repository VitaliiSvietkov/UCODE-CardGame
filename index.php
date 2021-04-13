<?php
  //require __DIR__ . '/vendor/autoload.php';
  //require_once(__DIR__ . "/models/connection/DatabaseConnection.php");
  //require_once(__DIR__ . "/models/Blueprint.php");
  require_once(__DIR__ . "/view/View.php");
  require_once(__DIR__ . "/controller/Controller.php");

  session_start();

  setcookie("servHost", $_SERVER['SERVER_NAME'], 0, "/");

  if (!isset($_SESSION["transition"]))
    $_SESSION["transition"] = "startscreen";
  
  if (!isset($_SESSION["controller"]))
    $_SESSION["controller"] = new Controller();

  $_SESSION["controller"]->transit();
  $_SESSION["controller"]->execute();
  