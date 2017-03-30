<?php
function countItem($value, $file)
{
    $data = json_decode(file_get_contents($file), true);
    $data[$value]++;
    file_put_contents($file, json_encode($data));
}