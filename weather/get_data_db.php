<?php

require('db_connect.php');

$selectQuery = "SELECT timestamp, temperature FROM forecast";
$result = mysqli_query($conn, $selectQuery);

$selectArray = array();
if (mysqli_num_rows($result) > 0) {
    while ($fetchedArray = mysqli_fetch_assoc($result)) {
        $timestamp = strtotime($fetchedArray['timestamp']);
        $selectArray[] = array(
            'dt' => $timestamp,
            'main'=> [ 'temp' => $fetchedArray['temperature']],
            'dt_txt' => $fetchedArray['timestamp'],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($selectArray);

mysqli_close($conn);