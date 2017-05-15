<?php
    session_start();

    error_reporting(E_ALL);

    if (!isset($_SESSION['id'])) {
        $controller = 'login';
    } else {
        $controller = 'chat';
    }

    include "controller/$controller.php";

    $content = generateContent();

    include 'view/template.php';