<?php
define('DATA_FILE', 'data.json');

include 'functions/checkDataFile.php';
include 'functions/countDataItem.php';
include 'functions/getDataJSON.php';
include 'functions/delete.php';

if (isset($_POST['delete'])) {
    deleteData(DATA_FILE);
    header('Location: http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']));
}

if (checkData(DATA_FILE)) {
    if (isset($_POST['name'])) {
        countItem($_POST["name"], DATA_FILE);
        header('location: http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']);
    }
    $data = getJSON(DATA_FILE);
    include 'view/chart.html';
} else {
    echo "Scusi!";
}
