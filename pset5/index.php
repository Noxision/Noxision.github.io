<?php
    session_start();

    if (!isset($_SESSION["name"])) {
        $controller = "login";
    } else {
        $controller = "chat";
    }

    include "controller/$controller.php";

    $content = generateContent($_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']));


    include "view/template.html";