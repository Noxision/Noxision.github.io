<?php
function userCheck($name, $pass)
{
    $serverName = 'localhost';
    $username = 'root';
    $dbName = 'easychat';

    $conn = mysqli_connect($serverName, $username, '', $dbName);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "SELECT * FROM users WHERE name = '$name'";

    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        if ($row['name'] == $name && $row['password'] == $pass){
            mysqli_close($conn);
            $_SESSION['id'] = $row['id'];
            if (isset($_SESSION['error'])) {
                unset($_SESSION['error']);
            }
            return true;
        } else {
            $_SESSION['error'] = '<p>You wrote incorrect name or password</p>';
        }
    } else {
        $sql = "INSERT INTO users (name, password) VALUES ('$name', '$pass')";
        mysqli_query($conn, $sql);

        $sql = "SELECT * FROM users WHERE name = '$name'";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);

        $_SESSION['id'] = $row['id'];

        mysqli_close($conn);
        return true;
    }
}