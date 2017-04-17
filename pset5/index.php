<?php
    session_start();

    if (!isset($_SESSION['name'])) {
        $controller = 'login';
    } else {
        $controller = 'chat';
    }

    include "controller/$controller.php";

    $content = generateContent();

    include 'view/template.php';