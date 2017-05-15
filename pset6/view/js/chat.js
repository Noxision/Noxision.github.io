$(document).ready(function () {

    requestData();

    $(document).keypress(function (e) {
        if (e.which == 13) {
            var input = $('.input_message');
            requestData(input.val());
            input.val('');
        }
    });

    $('.post_message').click(function () {
        var input = $('.input_message');
        requestData(input.val());
        input.val('');
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

    setInterval(requestData, 3000);
});