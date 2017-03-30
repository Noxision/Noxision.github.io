<?php
function checkData($file)
{
    function create_data($file)
    {
        $data = array(
            "red" => 0,
            "blue" => 0,
            "gray" => 0,
            "purple" => 0,
            "green" => 0,
        );
        return file_put_contents($file, json_encode($data));
    }

    if (file_exists($file)) {
        return true;
    } else {
        if (create_data($file) === false) {
            return false;
        }
        return true;
    }
}