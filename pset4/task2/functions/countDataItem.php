<?php
function countItem($value, $file)
{
    $data = json_decode(file_get_contents($file), true);
    if (isset($data[$value])) {
        $data[$value]++;
    } else {
        $data[$value] = 1;
    }
    file_put_contents($file, json_encode($data));
}