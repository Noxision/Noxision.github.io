<?php
function generateContent($root)
{
    $content = file_get_contents("view/chat.html");

    return $content;
}