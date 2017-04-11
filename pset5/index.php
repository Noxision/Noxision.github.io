<?php
    session_start();

    $_SESSION['root'] = $_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']);

    if (!isset($_SESSION['name'])) {
        $controller = 'login';
    } else {
        $controller = 'chat';
    }

    include "controller/$controller.php";

    $content = generateContent();

    include 'view/template.html';