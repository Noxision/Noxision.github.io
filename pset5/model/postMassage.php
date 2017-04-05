<?php
session_start();
date_default_timezone_set("Europe/Kiev");

$file = "massages.json";

if (isset($_POST["header"]) && !empty($_POST["data"])) {
    $massage = array("name" => $_SESSION["name"],
        "time" => time(),
        "data" => htmlentities($_POST["data"]));

    if (!file_exists($file)) {
        $jsonData = addDataToJson($file, $massage);
        echo checkLastMassages($jsonData);
    } else {
        $data = json_decode(file_get_contents($file), 2);
        $jsonData = addDataToJson($file, $massage, $data);
        echo checkLastMassages($jsonData);
    }
} elseif (isset($_POST["header"])) {
    if (file_exists($file)) {
        $jsonData = file_get_contents($file);
        echo checkLastMassages($jsonData);
    }
}

function addDataToJson($file, $massage, $data = null)
{
    if ($data == null) {
        $data = array();
    }
    array_push($data, $massage);
    $data = json_encode($data);
    file_put_contents($file, $data);
    return $data;
}

function checkLastMassages($jsonData)
{
    $time = time();
    $data = array();

    $jsonData = json_decode($jsonData, 2);

    foreach ($jsonData as $massage) {
        $odd = ($time - $massage["time"]);
        if ($odd < 3600) {
            $smileGood = ":)";
            $smileBad = ":(";
            $massage["data"] = str_replace($smileGood, "<img src=\"view\\img\\1.png\" 
                alt=\"Smiley face\" height=\"30\" width=\"30\">",
                $massage["data"]);
            $massage["data"] = str_replace($smileBad, "<img src=\"view\\img\\2.png\" 
                alt=\"Smiley face\" height=\"30\" width=\"30\">",
                $massage["data"]);
            $massage["time"] = date("H:i:s", $massage["time"]);
            array_push($data, $massage);
        }
    }
    return json_encode($data);
}
