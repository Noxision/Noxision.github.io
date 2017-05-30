<?php
function userCheck($name, $pass)
{
    require 'dbConnect.php';

    $conn = connect();

    $name = mysqli_real_escape_string($conn, $name);
    $pass = mysqli_real_escape_string($conn, $pass);

    $sql = sprintf("SELECT * FROM users WHERE name = '%s'", $name);

    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        if ($row['name'] == $name && password_verify($pass, $row['password'])) {
            mysqli_free_result($result);
            mysqli_close($conn);
            $_SESSION['id'] = $row['id'];
            if (isset($_SESSION['error'])) {
                unset($_SESSION['error']);
            }
            putLogs('User with id ' . $_SESSION['id'] . ' logged in.');
            return true;
        } else {
            $_SESSION['error'] = '<p>You wrote incorrect name or password</p>';
            mysqli_free_result($result);
            mysqli_close($conn);
            putLogs('User with ip ' . getClientIp() . ' can\'t login with wrong data.');
            return false;
        }
    } else {
        mysqli_free_result($result);

        $sql = sprintf("INSERT INTO users (name, password) VALUES ('%s', '%s')",
            $name, password_hash($pass, PASSWORD_BCRYPT));
        mysqli_query($conn, $sql);

        $sql = sprintf("SELECT * FROM users WHERE name = '%s'", $name);
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);

        $_SESSION['id'] = $row['id'];
        putLogs('User with id ' . $_SESSION['id'] . ' registered.');
        putLogs('User with id ' . $_SESSION['id'] . ' logged in.');
        mysqli_free_result($result);
        mysqli_close($conn);
        return true;
    }
}
