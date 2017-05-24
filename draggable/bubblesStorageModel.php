<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
     header('Location: index.php');

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = 'bubblesStorage.json';

    if(isset($_POST['getBubbles'])) {
        if(file_exists($file)) {
            echo file_get_contents($file);
        }
    } elseif (isset($_POST['putBubbles'])) {
        $data = json_decode($_POST['putBubbles'], true);

        function putPostDataToStorageArray($content, $data, $file) {
            $id = --$data['nextCount'];
            $content['nextCount'] = $data['nextCount'];
            $content['bubbles'][$id] = $data[$id];
            file_put_contents($file, json_encode($content, JSON_PRETTY_PRINT));
        }

        if(file_exists($file)) {
            $content = json_decode(file_get_contents($file), true);

            putPostDataToStorageArray($content, $data, $file);
        } else {
            $content = [];
            $content['bubbles'] = [];

            putPostDataToStorageArray($content, $data, $file);
        }
    } elseif (isset($_POST['changePosition'])) {
        $data = json_decode($_POST['changePosition'], true);
        $content = json_decode(file_get_contents($file), true);

        $content['bubbles'][$data['id']]['left'] = $data['left'];
        $content['bubbles'][$data['id']]['top'] = $data['top'];

        file_put_contents($file, json_encode($content, JSON_PRETTY_PRINT));
    } elseif (isset($_POST['changeText'])) {
        $data = json_decode($_POST['changeText'], true);
        $content = json_decode(file_get_contents($file), true);

        $content['bubbles'][$data['id']]['text'] = $data['text'];

        file_put_contents($file, json_encode($content, JSON_PRETTY_PRINT));
    } elseif (isset($_POST['remove'])) {
        $data = json_decode($_POST['remove'], true);
        $content = json_decode(file_get_contents($file), true);

        unset($content['bubbles'][$data['id']]);

        file_put_contents($file, json_encode($content, JSON_PRETTY_PRINT));
    }
}
?>
