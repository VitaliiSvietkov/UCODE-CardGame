<?php
class Login extends Blueprint {
  private $id;
  private $login, $password;

  public function __construct($table, $login, $password) {
      parent::__construct($table);
      $this->login = trim($login);
      $this->password = trim($password);
  }
}
?>
