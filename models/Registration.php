<?php
    require_once(__DIR__ . "/Blueprint.php");

    class Registration extends Blueprint {
        private $login, $password, $name, $email;

        public function __construct($table, $login, $password, $name, $email) {
            parent::__construct($table);
            $this->login = trim($login);
            $this->password = trim($password);
            $this->name = trim($name);
            $this->email = trim($email);
        }
    }