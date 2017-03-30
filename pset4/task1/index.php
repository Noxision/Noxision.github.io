<?php
// Task1
function resultTask1()
{
    $data = 0;
    for ($i = -1000; $i <= 1000; ++$i) {
        $data += $i;
    }
    echo $data;
}

// Task2
function resultTask2()
{
    $data = 0;
    $array = Array(2, 3, 7);
    for ($i = -1000; $i <= 1000; ++$i) {
        if (in_array(abs($i % 10), $array, true)) {
            $data += $i;
        }
    }
    echo $data;
}

// Task3
$dataTask3 = "";

if (isset($_POST["task3"])) {
    $dataTask3 = resultTask3();
}

function resultTask3()
{
    $data = "";

    for ($i = 0; $i < 50; ++$i) {
        for ($j = 0; $j <= $i; ++$j) {
            $data .= "*";
        }
        $data .= "\n";
    }
    return nl2br($data);
}

// Task4
$dataTask4 = "";

if (isset($_POST["board_height"]) && isset($_POST["board_width"])) {
    $dataTask4 = resultTask4($_POST["board_height"], $_POST["board_width"]);
}

function resultTask4($height, $width)
{
    $style = 'style="border: 1px solid black; border-collapse: collapse;"';

    $output = '<table ' . $style . ' >';
    for ($i = 0; $i < $height; ++$i) {
        $output .= '<tr ' . $style . ' >';
        for ($j = 0; $j < $width; ++$j) {

            ($i + $j) % 2 == 0 ? $color = "white;" : $color = "black;";

            $output .= '<td style="min-width:30px;height:30px;background-color:'
                . $color . '" ></td>';
        }
        $output .= '</tr>';
    }
    $output .= '</table>';

    return $output;
}

// Task5
$dataTask5 = "";

if (isset($_POST["task5"])) {
    $dataTask5 = resultTask5($_POST["number"]);
}

function resultTask5($number)
{
    return array_reduce(str_split($number), function ($a, $b) {
        return ($a + $b);
    });
}

if (isset($_POST["reset"])) {
    header("http://" . $_SERVER["HTTP_HOST"] . $_SERVER["PHP_SELF"]);
}

include "view.html";
