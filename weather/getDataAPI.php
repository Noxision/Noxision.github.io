<?php
$url = "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/1-324505_1_AL?apikey=Hvp1nNLoXf6zILXTjnYU1FoHMzJreGhl&language=ru-RU";
$data = file_get_contents($url);
$data = json_decode(file_get_contents($url), true);

$dataAPI = [];

foreach ($data as $i) {
    array_push($dataAPI, array(
        'dt' => $i['EpochDateTime'],
        'main'=> [ 'temp' => ($i['Temperature']['Value'] - 32) / 1.8],
        'dt_txt' => $i['DateTime'],
    ));
}
header('Content-Type: application/json');
echo json_encode($dataAPI);
