<?php
function userCheck($name, $pass)
{
    $file = 'users.json';

    if (!file_exists($file)) {
        $data = [];
        $data[$name] = $pass;
        file_put_contents($file, json_encode($data));
        return true;
    }

    $data = json_decode(file_get_contents($file), true);

    if (isset($data[$name]) && $data[$name] == $pass) {
        return true;
    } elseif (!isset($data[$name])) {
        $data[$name] = $pass;
        file_put_contents($file, json_encode($data));
        return true;
    }
    return false;
}