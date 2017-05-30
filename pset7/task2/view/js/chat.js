$(document).ready(function () {
    getInfo();
    consoleLog('You just logged in.');

    requestData();

    $(document).keypress(function (e) {
        if (e.which == 13) {
            var input = $('.input_message');
            if (input.val()) {
                consoleLog('You posted message.');
                requestData(input.val());
                input.val('');
            } else {
                consoleLog('Your message is empty.');
            }
        }
    });

    $('.post_message').click(function () {
        var input = $('.input_message');
        if (input.val()) {
            consoleLog('You posted message.');
            requestData(input.val());
            input.val('');
        } else {
            consoleLog('Your message is empty.');
        }
    });

    function requestData(sendData) {
        $.post('model/postMessage.php', {
            header: 'message',
            data: sendData
        }, function (data) {
            if (data != '') {
                var messages = JSON.parse(data);
                $('.text_field').text('');
                messages.forEach(function (item) {
                    var headerString = '[' + item.time + ']' + ' <b>'
                        + item.name + ':</b> ' + item.data;
                    var text = $('<div></div>').html(headerString);
                    $('.text_field').append(text);
                });
            } else {
                $('.text_field').text('');
            }
        });
    }

    $('.log-button').on('click', function() {
        $.post('index.php', {
            logout: 'unset',
        }).done(function() {
            window.location.reload();
        });
    });

    setInterval(requestData, 3000);
});
