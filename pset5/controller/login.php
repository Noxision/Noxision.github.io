<?php
function generateContent()
{
    if (isset($_POST['name']) && isset($_POST['password'])) {
        include 'model/checkData.php';
        if (userCheck(htmlentities($_POST['name']),
            htmlentities($_POST['password']))) {
            $_SESSION['name'] = htmlentities($_POST['name']);
        }
            header('Location: http://' . $_SESSION['root']);
    } else {
        $content = file_get_contents('view/login.html');
    }
    return $content;
}
