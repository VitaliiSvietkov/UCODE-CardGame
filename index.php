<?php
  require_once(__DIR__ . "/view/View.php");
  require_once(__DIR__ . "/controller/Controller.php");

  session_start();

  if (!isset($_SESSION["transition"]))
    $_SESSION["transition"] = "login";
  
  if (!isset($_SESSION["controller"]))
    $_SESSION["controller"] = new Controller();

  $_SESSION["controller"]->transit();
  $_SESSION["controller"]->execute();
?>
