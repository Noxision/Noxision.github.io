// How do you?
$(document).ready(function () {

    $('#json').click(function () {
        $.getJSON("data/today.json", function (data) {
            data = data.list;
            appendSection(data);
        });
        return false;
    });

    $('#data_base').click(function () {
        $.post('get_data_db.php', function (data) {
            appendSection(data);
        });
        return false;
    });

    $('#API').click(function () {
        $.post('getDataAPI.php', function (data) {
            appendSection(data);
        });
        return false;
    });

    function appendSection(data) {
        var lastStamp = 0;
        var lastTemp = 0;
        var curDate = Date.now() / 1000 | 0;
        var svg = $('.forecast-icon').html();
        $('.forecast').html("");
        $.each(data.reverse(), function (index, value) {
            if (value.main.temp > 200)
                var formattedTemp = Math.round(value.main.temp - 273.15);
            else
                var formattedTemp = Math.round(value.main.temp);
            str = '<div id="' + 'weather_row_' + index + '" class="hourly-forecast clearfix">' +
                '<div class="forecast-date">' + value.dt_txt + '</div>' +
                '<div class="forecast-weather">' +
                '<div class="forecast-temperature">' + formattedTemp + ' &deg;</div>' +
                '<div class="forecast-icon">' + svg +
                '</div></div></div>';
            $('.forecast').append(str);

            if ((curDate - value.dt) < (curDate - lastStamp)) {
                lastStamp = value.dt;
                lastTemp = formattedTemp;
            }

            $('.current-temperature').html(lastTemp + " &deg");
            var daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            var date = new Date(lastStamp * 1000);
            $('.date').html(daysInWeek[date.getDay()] + " " + date.getDate() + "/" + (date.getMonth() + 1));
        });
    }
});
