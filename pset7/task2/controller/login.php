<?php
function generateContent()
{
    if (isset($_POST['name']) && isset($_POST['password'])) {
        include 'model/checkData.php';

        userCheck(htmlentities($_POST['name']), htmlentities($_POST['password']));
        header('Location: http://'.$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']));
    } else {
        if (isset($_SESSION['error'])) {
            $content = $_SESSION['error'] . file_get_contents('view/loginPage.php');
        } else {
            $content = file_get_contents('view/loginPage.php');
        }
    }
    return $content;
}
