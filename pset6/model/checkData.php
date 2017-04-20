<?php
function userCheck($name, $pass)
{
    $serverName = 'localhost';
    $username = 'root';
    $dbName = 'easy_chat';

    $conn = mysqli_connect($serverName, $username, '', $dbName);

    if (!$conn) {
        die('Connection failed: ' . mysqli_connect_error());
    }

    $name = mysqli_real_escape_string($conn, $name);
    $pass = mysqli_real_escape_string($conn, $pass);

    $sql = sprintf("SELECT * FROM users WHERE name = '%s'", $name);

    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        $row = mysqli_fetch_assoc($result);
        if ($row['name'] == $name && $row['password'] == $pass) {
            mysqli_free_result($result);
            mysqli_close($conn);
            $_SESSION['id'] = $row['id'];
            if (isset($_SESSION['error'])) {
                unset($_SESSION['error']);
            }
            return true;
        } else {
            $_SESSION['error'] = '<p>You wrote incorrect name or password</p>';
            mysqli_free_result($result);
            mysqli_close($conn);
            return false;
        }
    } else {
        mysqli_free_result($result);

        $sql = sprintf("INSERT INTO users (name, password) VALUES ('%s', '%s')", $name, $pass);
        mysqli_query($conn, $sql);

        $sql = sprintf("SELECT * FROM users WHERE name = '%s'", $name);
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);

        $_SESSION['id'] = $row['id'];

        mysqli_free_result($result);
        mysqli_close($conn);
        return true;
    }
}