<?php
if(isset($_POST['data']) && !empty($_POST['data'])) {
    $data = json_decode($_POST['data'], true);
    // Ключи и регулярные выражения массива regex должны соответствовать id инпутов на страничке и типу вводных данных
    $regex = [
        'ip' => '/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/',
        'url' => '#((https?|ftp)://(\S*?\.\S*?))([\s)\[\]{},;"\':<]|\.\s|$)#i',
        'email' => '/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i',
        'date' => '/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/',
        'time' => '/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/'
    ];

    $dontMatch = 0;
    foreach ($data as $key => $value) {
        if($value) {
            if(!preg_match($regex[$key], $value)){
                echo $key . " не прошоло проверку.\n";
                $dontMatch++;
            }
        } else {
            echo $key . " заполните поле.\n";
            $dontMatch++;
        }
    }
    if(!$dontMatch) {
        echo "Все поля прошли проверку.";
    }
}
?>
