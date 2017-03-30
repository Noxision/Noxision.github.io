<?php
function getJSON($file)
{
    $data = file_get_contents($file);
    return $data;
}