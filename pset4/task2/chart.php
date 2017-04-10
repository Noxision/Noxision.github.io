<?php
session_start();

include 'functions/checkDataFile.php';
include 'functions/countDataItem.php';

if (!isset($_SESSION['name'])) {
    header('Location: http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']));
}

if (isset($_POST['delete'])) {
    unlink('data.json');
    unset($_SESSION['name']);
    header('Location: http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']));
}

if (checkData('data.json')) {
    if (isset($_POST['name'])) {
        countItem($_POST['name'], 'data.json');
        $_SESSION['name'] = $_POST['name'];
        header('location: http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF']);
    }
    $data = file_get_contents('data.json');
    include 'view/chart.html';
}