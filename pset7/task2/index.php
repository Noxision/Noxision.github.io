<?php
    session_start();

    if (!isset($_SESSION['id'])) {
        $controller = 'login';
    } else {
        $controller = 'chat';
    }

    include 'controller/log.php';

    include "model/logout.php";
    include "controller/$controller.php";

    $content = generateContent();

    include 'view/template.php';
