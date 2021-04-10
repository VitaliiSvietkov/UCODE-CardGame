<?php
class Controller {
  public $view;

  public function __construct() {
    $this->view = new View(__DIR__ . '/../view/templates/login.html');
  }

  public function transit() {
    if (isset($_POST["transit"])) {
      $_SESSION["transition"] = $_POST["transit"];
    }
    $this->view = new View(__DIR__ . "/../view/templates/" . $_SESSION["transition"] . ".html");
  }

  public function execute() {
    $this->view->render();
  }
}
?>
