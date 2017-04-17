<?php
function generateContent()
{
    if (isset($_POST['name']) && isset($_POST['password'])) {
        include 'model/checkData.php';
        if (userCheck(htmlentities($_POST['name']),
            htmlentities($_POST['password']))) {
            $_SESSION['name'] = htmlentities($_POST['name']);
            if (isset($_SESSION['error'])) {
                unset($_SESSION['error']);
            }
        } else {
            $_SESSION['error'] = '<p>You wrote incorrect name or password</p>';
        }
        header('Location: http://'.$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']));
    } else {
        if (isset($_SESSION['error']))
            $content = $_SESSION['error'] . file_get_contents('view/loginPage.php');
        else
            $content = file_get_contents('view/loginPage.php');
    }
    return $content;
}

