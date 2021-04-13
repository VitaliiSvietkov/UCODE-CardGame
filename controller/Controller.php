<?php
class Controller {
  public $view;

  public function __construct() {
    $this->view = new View(__DIR__ . '/../view/templates/startscreen.html');
  }

  public function transit() {
    if (isset($_POST["transit"])) {
      switch($_POST["transit"]) {
        case "remind":
          require_once(__DIR__ . "/../models/Remind.php");
          $remind_entity = new Remind("card_game", $_POST["username"]);
          $remind_entity->send();
          break;
        case "exit":
          unset($_SESSION["user"]);
          setcookie("user", "", time() - 3600);
          $_SESSION["transition"] = "startscreen";
          break;
        default:
          $_SESSION["transition"] = $_POST["transit"];
          break;
      }
    }
    else {
      if (isset($_POST["username"])) {
        $_SESSION["transition"] = "chose_game";
        $_SESSION["user"] = $_POST["username"];
        setcookie("user", $_POST["username"], 0, "/");
      }
    }
    $this->view = new View(__DIR__ . "/../view/templates/" . $_SESSION["transition"] . ".html");
  }

  public function execute() {
    $this->view->render();
  }
}
?>
