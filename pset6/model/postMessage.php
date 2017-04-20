<?php
session_start();
date_default_timezone_set('Europe/Kiev');

$serverName = 'localhost';
$username = 'root';
$dbName = 'easy_chat';

if (isset($_POST['header']) && !empty($_POST['data'])) {
    addMessages($serverName, $username, $dbName);
    checkLastMessages($serverName, $username, $dbName);
} elseif (isset($_POST['header'])) {
    checkLastMessages($serverName, $username, $dbName);
}

function addMessages($serverName, $username, $dbName)
{
    $conn = mysqli_connect($serverName, $username, '', $dbName);

    if (!$conn) {
        die('Connection failed: ' . mysqli_connect_error());
    }

    $data = mysqli_real_escape_string($conn, htmlentities($_POST['data']));

    $sql = sprintf("INSERT INTO messages (message, users_id) VALUES ('%s', '%d')",
        $data, $_SESSION['id']);

    mysqli_query($conn, $sql);

    mysqli_close($conn);
}

function checkLastMessages($serverName, $username, $dbName)
{
    $conn = mysqli_connect($serverName, $username, '', $dbName);

    if (!$conn) {
        die('Connection failed: ' . mysqli_connect_error());
    }

    $sql = sprintf("SELECT TIME(messages.time) AS time, 
                                users.name AS name, 
                                messages.message AS data 
                           FROM messages 
                     INNER JOIN users ON messages.users_id = users.id 
                          WHERE messages.time >= DATE_SUB(NOW(), interval 1 hour) 
                       ORDER BY users.id DESC");

    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $messages = [];

        while ($row = $row = mysqli_fetch_assoc($result)) {
            $row['name'] = stripslashes($row['name']);
            $row['data'] = stripslashes($row['data']);

            $smileGood = ':)';
            $smileBad = ':(';
            $row['data'] = str_replace($smileGood, "<img src=\"view\\img\\1.png\"
                alt=\"Smiley face\" height=\"30\" width=\"30\">",
                $row['data']);
            $row["data"] = str_replace($smileBad, "<img src=\"view\\img\\2.png\"
                alt=\"Smiley face\" height=\"30\" width=\"30\">",
                $row['data']);

            array_push($messages, $row);
        }

        $messages = json_encode($messages);
        echo $messages;
    }

    mysqli_free_result($result);
    mysqli_close($conn);
}