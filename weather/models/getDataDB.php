<?php

require('dbConnect.php');

$selectQuery = "SELECT timestamp, temperature, rain_possibility, clouds FROM forecast";
$result = mysqli_query($conn, $selectQuery);

$selectArray = array();
if (mysqli_num_rows($result) > 0) {
    while ($fetchedArray = mysqli_fetch_assoc($result)) {
        $timestamp = strtotime($fetchedArray['timestamp']);
        if ($fetchedArray['rain_possibility'] > 0.7)
            $sky = 'Rain';
        elseif ($fetchedArray['clouds'] > 20)
            $sky = 'Clouds';
        else
            $sky = 'Clear';

        $selectArray[] = array(
            'dt' => $timestamp,
            'main'=> ['temp' => $fetchedArray['temperature']],
            'dt_txt' => $fetchedArray['timestamp'],
            'weather' => [['main' => $sky]],
        );
    }
}

header('Content-Type: application/json');
echo json_encode($selectArray);

mysqli_close($conn);