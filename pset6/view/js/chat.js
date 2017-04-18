$(document).ready(function () {

    requestData();

    $(document).keypress(function (e) {
        if (e.which == 13) {
            var input = $('.input_massage');
            requestData(input.val());
            input.val('');
        }
    });

    $('.post_massage').click(function () {
        var input = $('.input_massage');
        requestData(input.val());
        input.val('');
    });

    function requestData(sendData) {
        $.post('model/postMassage.php', {
            header: 'massage',
            data: sendData
        }, function (data) {
            if (data != '') {
                var massages = JSON.parse(data);
                $('.text_field').text('');
                massages.forEach(function (item) {
                    var headerString = '[' + item.time + ']' + ' <b>'
                        + item.name + ':</b> ' + item.data;
                    var text = $('<div></div>').html(headerString);
                    $('.text_field').append(text);
                });
            }
        });
    }

    setInterval(requestData, 3000);
});