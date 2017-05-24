$(document).ready(function () {
    // Объект отвечающий за методы пузырей
    var bubble = {};

    // Следующий доступный ID создаваемого пузыря по умолчанию, далее меняется в зависимости от данных полученных с сервера
    bubble.count = 1;

    var c = $('.container');

    c.on('dblclick', function (e) {
        var x = e.pageX + 'px';
        var y = e.pageY + 'px';
        bubble.put(bubble.render(x, y, ''));
    });

    c.on('dblclick', '.drag', function (e) {
        e.stopPropagation();

        var input = '<input type="text" size="15">';
        var text = $(this).text();

        $(this).text('')
            .append(input)
            .find('input')
            .val(text)
            .on('dblclick', function () {
                return false;
        }).focus();

        // Обработчик снятия фокуса с инпута
        $(this).find('input').on('blur', function () {
            var id = parseInt($(this).parent().attr('id').match(/[0-9]+/g)[0]);

            var text = $(this).val();
            if (!text) {
                $(this).parent().remove();
                bubble.remove({'id' : id});
            } else {
                $(this).parent().off('keydown').text(text);
                bubble.changeText({'id' : id, 'text' : text});
            }
        });

        // Обработчик нажатия клавиш Enter и Escape
        $(this).on('keydown', function (e) {
            $(this).off('focusout');
            var id = parseInt($(this).attr('id').match(/[0-9]+/g)[0]);
            var text = $(this).find('input').val();
            if (e.which == 13) {
                if (!text) {
                    $(this).remove();
                    bubble.remove({'id' : id});
                } else {
                    $(this).text(text);
                    bubble.changeText({'id' : id, 'text' : text});
                }
            } else if (e.which == 27){
                $(this).text('');
                bubble.changeText({'id' : id, 'text' : ''});
            }
        });
    });

    // Метод передачи на сервер информации про новый созданный пузыря
    bubble.put = function (data) {
        var sendData = {};

        sendData[data.id] = {
                            'left' : data.left,
                            'top' : data.top,
                            'text' : ''
                            };

        // Переменная для записи на сервер, которая хранит следующий доступный ID для создаваемого пузыря
        sendData.nextCount = this.count;

        $.post( 'bubblesStorageModel.php',
            {'putBubbles' : JSON.stringify(sendData)});
    };

    // Метод для получения и рендеринга пузырей с сервера
    bubble.get = function () {
        $.post( 'bubblesStorageModel.php',
            {'getBubbles' : ''},
            function( data ) {
                if (data) {
                    var content = JSON.parse(data);
                    if (content.nextCount) {

                        // Установка доступного ID
                        bubble.count = content.nextCount;
                    }
                    if (content.bubbles) {

                        // Рендеринг пузырей с сервера
                        $.each(content.bubbles, function (index, value) {
                            bubble.count = index;
                            bubble.render(value.left + 'px',
                                          value.top + 'px',
                                          value.text);
                        });
                    }
                }
        });
    };

    // Метод для рендеринга пузырей
    bubble.render =  function(x, y, data) {
        var id = this.count;

        ++this.count;

        c.append('<div class="drag" id="draggable' + id + '"></div>');

        var draggableObject = $('#draggable' + id);

        draggableObject.css({
            top: y,
            left: x,
            position: 'absolute'
        });

        draggableObject.draggable({
            cursor: "move",
            cursorAt: { top: 10, left: 50 },
            containment: '.container',
            scroll: false,

            // Обработчик для передачи последних координат на сервер
            stop: function() {
                bubble.changePosition({
                        'id' : id,
                        'left' : draggableObject.position().left,
                        'top' : draggableObject.position().top
                        });
            }
        }).text(data);

        return {
                'id' : id,
                'left' : draggableObject.position().left,
                'top' : draggableObject.position().top
                };
    };

    // Метод передачи координат на сервер
    bubble.changePosition = function(position) {
        $.post( 'bubblesStorageModel.php',
            {'changePosition' : JSON.stringify(position)});
    }

    // Метод передачи текста на сервер
    bubble.changeText = function(text) {
        $.post( 'bubblesStorageModel.php',
            {'changeText' : JSON.stringify(text)});
    }

    // Метод передачи ID элемента который подлежит удалению
    bubble.remove = function(id) {
        $.post( 'bubblesStorageModel.php',
            {'remove' : JSON.stringify(id)});
    }

    bubble.get();

}).disableSelection();
