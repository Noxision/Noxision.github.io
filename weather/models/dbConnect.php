<?php

$serverName = "localhost";
$usernameDB = "root";
$passwordDB = "";
$dbName = "weather";
$conn = mysqli_connect($serverName, $usernameDB, $passwordDB, $dbName);

if (!$conn) {
    die("Connection failed: ".mysqli_connect_error());
}