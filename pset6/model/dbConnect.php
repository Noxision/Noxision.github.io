<?php
function connect()
{
    $serverName = 'localhost';
    $username = 'admin';
    $dbName = 'easy_chat';
    $password = 'admin';

    $conn = mysqli_connect($serverName, $username, $password, $dbName);

    if (!$conn) {
        die('Connection failed: ' . mysqli_connect_error());
    }

    return $conn;
}