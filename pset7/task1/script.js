$(document).ready(function() {

    // Объект regex содержит ключи и регулярные выражения для определенного типа ввода.
    // Ключи должны соответствовать с id инпутов в html страничке.
    var regex = {
        'ip' : /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/g,
        'url' : /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        'email' : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'date' : /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/,
        'time' : /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/
    }

    JShandler();

    $('.choose-form input').change(function () {
        $('.sbmt').remove();
        $('.input-container input').val('');

        if ($(this).is(':checked') && $(this).val() == 'JS') {
            // Запуск обработчика JS и смена заголовка
            JShandler();
            $('.title').text('Check with JS');
        } else if ($(this).is(':checked') && $(this).val() == 'PHP') {
            // Отключение прослушивания событий на инпутах и изменение цвета outline инпутов к default color
            $('.input-container input').off('input').css({'outline-color': '#7CBBFF'});
            $('.title').text('Check with PHP');
            // Добавление button и окна для результатов проверки на PHP
            $('.container').append('<button class="php-button sbmt" type="button" name="button">PHP Validate</button><pre class="result sbmt"></pre>');
            // Выборка всех значений инпутов в объект rows и передача его на сервер в виде JSON объекта
            $('.php-button').on('click', function() {

                // Объект rows содержит ключи, корые исходят из regex и значения из инпутов с соответствующими id
                rows = getInputVal(regex);

                $.post( "valid.php", {'data': JSON.stringify(rows)}, function( data ) {
                    $( ".result" ).text( data );
                });
            });
        }
    });

    $('.area-sbmt').on('click', function () {
        var inputRegex = $('#input-regex').val();
        var str = $('.container-2 textarea').val().toString();

        var inputRegex = new RegExp(inputRegex, 'gim');

        $('.area-result').html(str.replace(inputRegex, function (str) {
            return '<mark>' + str + '</mark>';
        }));
    });

    // Возвращат объект со значениями инпутов
    function getInputVal(regex) {
        rows = {};
        $.each(regex, function(key, value) {
            rows[key] = $('#'+key).val();
        });
        return rows;
    }

    // Проверяет значение каждого инпута на соответствие регулярному выражению
    function JShandler() {
        $.each(regex, function(key, value) {
            $('#'+key).on('input', function () {
                matchReg(value, this);
            });
        });
    }

    // Проверяет значение на соответствие регулярному выражению
    function matchReg(reg, obj) {
        if($(obj).val().match(reg)) {
            $(obj).css({'outline-color': 'green'});
        } else {
            $(obj).css({'outline-color': 'red'});
        }
    }
});
