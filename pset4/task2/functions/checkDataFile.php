<?php
function checkData($file)
{
    function createData($file)
    {
        $data = [];
        return file_put_contents($file, json_encode($data));
    }

    if (file_exists($file)) {
        return true;
    } else {
        if (createData($file) === false) {
            return false;
        }
        return true;
    }
}