<?php

if (isset($_POST['logout']) && $_POST['logout'] == 'unset') {
    putLogs('User with id ' . $_SESSION['id'] . ' logged out.');

    session_destroy();
}
