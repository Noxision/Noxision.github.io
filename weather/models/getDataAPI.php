<?php
$url = "http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/1-324505_1_AL?apikey=Hvp1nNLoXf6zILXTjnYU1FoHMzJreGhl&language=ru-RU";
$data = file_get_contents($url);
$data = json_decode(file_get_contents($url), true);

$dataAPI = [];

foreach ($data as $i) {
    if ($i['WeatherIcon'] >= 12 && $i['WeatherIcon'] <= 18)
        $sky = 'Rain';
    elseif ($i['WeatherIcon'] >= 6 && $i['WeatherIcon'] <= 11)
        $sky = 'Clouds';
    else
        $sky = 'Clear';

    array_push($dataAPI, array(
        'dt' => $i['EpochDateTime'],
        'main'=> [ 'temp' => ($i['Temperature']['Value'] - 32) / 1.8],
        'dt_txt' => gmdate("Y-m-d H:i:s", $i['EpochDateTime']),
        'weather' => [['main' => $sky]],
    ));
}
header('Content-Type: application/json');
echo json_encode($dataAPI);
