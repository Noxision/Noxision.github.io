function getElem(id) {
    return document.getElementById(id);
}

function click(id, func) {
    getElem(id).addEventListener("click", func);
}

function print(id, value) {
    getElem(id).innerHTML = value;
}

function resetValidation(id) {
    if (getElem(id).innerHTML != "") {
        print(id, "");
    }
}

// ----------------------Task1-----------------------------
click("task1-button", task1);
click("task1-reset", resetTask1);

function task1() {
    var sum = 0;

    for (var i = -1000; i <= 1000; ++i) {
        sum += i;
    }

    print("task1", "Ответ: " + sum);
}

// Функция даного типа обнуляет все действия пользователя
function resetTask1() {
    print("task1", "");
}

// ----------------------Task2-----------------------------
click("task2-button", task2);
click("task2-reset", resetTask2);

function task2() {
    var sum = 0;

    for (var i = -1000; i <= 1000; ++i) {
        if (Math.abs(i) % 10 == 2 ||
            Math.abs(i) % 10 == 3 ||
            Math.abs(i) % 10 == 7) {
            sum += i;
        }
    }

    print("task2", "Ответ: " + sum);
}

function resetTask2() {
    print("task2", "");
}

// ----------------------Task3-----------------------------
click("task3-button", task3);
click("task3-reset", resetTask3);

function task3() {
    var string = "";
    var subString = "";

    for (var i = 0; i < 50; ++i) {
        for (var j = 0; j <= i; ++j) {
            subString += "*";
        }
        string += subString + "<br>";
        subString = "";
    }

    print("task3", string);
}

function resetTask3() {
    print("task3", "");
}

// ----------------------Task4-----------------------------
click("task4-button", task4);
click("task4-reset", resetTask4);

function task4() {
    var inpObj = getElem("input-task4");

    /* Условие даного типа проверяет валидность и выводит сообщение
    при несоответствии введенных данных */
    if (inpObj.checkValidity() == false) {
        resetValidation("task4");
        print("error-task4", inpObj.validationMessage);
    } else {
        resetValidation("error-task4");
        var output = "";

        /* Исходя из того что в сутках 86400 секунд команда ниже
        изымает из введенного значения количество целых суток,
        которое не выводится пользователю (по условию задачи)
        и приводит его к суточному значению.*/
        inpObj = inpObj.value % 86400;

        /* Условие ниже на основании того что на часах "24:00:00" == "00:00:00"
         определяет настоящее количество прошедшего времени. */
        if (inpObj == 0) {
            print("task4", "Ответ: 24:00:00");
        } else {

            // Вычисление количества часов, минут, секунд
            var hours = Math.floor(inpObj / 3600);
            var mints = Math.floor((inpObj - hours * 3600) / 60);
            var secds = Math.floor(inpObj - hours * 3600 - mints * 60);

            output  += makeOutStr(hours)
                    + ":" + makeOutStr(mints)
                    + ":" + makeOutStr(secds);

            print("task4", "Ответ: " + output);
        }
    }
}

// Добавление "0" к значению в итоговую строку, если значение имеет один символ.
function makeOutStr(data) {
    var str = "";
    if (data < 10) {
        str += "0" + data;
    } else {
        str += data;
    }
    return str;
}

function resetTask4() {
    getElem("input-task4").value = "";
    print("task4", "");
    print("error-task4", "");
}

// ----------------------Task5-----------------------------
click("task5-button", task5);
click("task5-reset", resetTask5);

function task5() {
    var inpObj = getElem("input-task5");
    if (inpObj.checkValidity() == false) {
        resetValidation("task5");
        print("error-task5", inpObj.validationMessage);
    } else {
        resetValidation("error-task5");
        var output = "";

        inpObj = inpObj.value;
        var lastDigit = inpObj % 10;

        // Условие ниже добавляет правильное имя существительное для падежа.
        if (11 <= getLastDigits(inpObj) && getLastDigits(inpObj) <= 19) {
            output += inpObj + " лет";
        } else if (0 == lastDigit || (5 <= lastDigit && lastDigit <= 9)) {
            output += inpObj + " лет";
        } else if (1 == lastDigit) {
            output += inpObj + " год";
        } else {
            output += inpObj + " года";
        }

    return print("task5", "Ответ: " + output);
    }
}

// Функция ниже возвращает две последние цифры введенного числа.
function getLastDigits(years) {
    if (years < 100) {
        return years;
    }
    return years - (Math.floor(years / 100) * 100);
}

function resetTask5() {
    getElem("input-task5").value = "";
    print("task5", "");
    print("error-task5", "");
}

// ----------------------Task6-----------------------------
click("task6-button", task6);
click("task6-reset", resetTask6);

var patternTask6 = "((January|March|April|May|June|July|August|September|\
October|November|December) ([3][0-1]|[1-2][0-9]|[1-9])|February \
([2][0-8]|[1][0-9]|[1-9])), [0-9]{1,4} ([2][0-3]|[0-1][0-9]):\
[0-5][0-9]:[0-5][0-9]";

function task6() {
    getElem("date1-task6").pattern = patternTask6;
    getElem("date2-task6").pattern = patternTask6;

    var date1 = getElem("date1-task6");
    var date2 = getElem("date2-task6");

    if (date1.checkValidity() == false) {
        resetValidation("task6");
        print("error-task6", "Дата 1: " + date1.validationMessage);
    } else if (date2.checkValidity() == false) {
        resetValidation("task6");
        print("error-task6", "Дата 2: " + date2.validationMessage);
    } else {
        resetValidation("error-task6");
        date1 = new Date(date1.value);
        date2 = new Date(date2.value);

        var time = [];
        var str = "";

        time = getTime(time, date1, date2);

        print("task6", getString(str, time));
  }
}

function getTime(time, date1, date2) {
    var date1_s = date1.getTime();
    var date2_s = date2.getTime();

    if (date2_s > date1_s) {
        var temp = date2;
        date2 = date1;
        date1 = temp;
    }

    if (((date1.getTime() - date2.getTime()) / 1000) >= 31536000) {
        time[0] = date1.getFullYear() - date2.getFullYear();
    } else {
        time[0] = 0;
    }

    if (date1.getMonth() < date2.getMonth()) {
        time[1] = date1.getMonth() - date2.getMonth() + 12;
        if (time[0]) {
            --time[0];
        }
    } else if ((date1.getMonth() == date2.getMonth()) &&
                (date1.getDate() < date2.getDate())) {
        time[1] = 11;
        if (time[0]) {
            --time[0];
        }
    } else {
        time[1] = date1.getMonth() - date2.getMonth();
    }

    if (date1.getDate() < date2.getDate()) {
        time[2] = date1.getDate() - date2.getDate() + 30;
        if (time[1] && time[1] != 11) {
            --time[1];
        }
    } else {
        time[2] = date1.getDate() - date2.getDate();
    }

    if (date1.getHours() < date2.getHours()) {
        time[3] = date1.getHours() - date2.getHours() + 24;
        if (time[2]) {
            --time[2];
        }
    }   else {
        time[3] = date1.getHours() - date2.getHours();
    }

    if (date1.getMinutes() < date2.getMinutes()) {
        time[4] = date1.getMinutes() - date2.getMinutes() + 60;
        if (time[3]) {
            --time[3];
        }
    }   else {
        time[4] = date1.getMinutes() - date2.getMinutes();
    }

    if (date1.getSeconds() < date2.getSeconds()) {
        time[5] = date1.getSeconds() - date2.getSeconds() + 60;
        if (time[4]) {
            --time[4];
        }
    }   else {
        time[5] = date1.getSeconds() - date2.getSeconds();
    }
    return time;
}

function getString(str, time) {
    var words = [["год", "года", "лет"],
                ["месяц", "месяца", "месяцев"],
                ["день", "дня", "дней"],
                ["час", "часа", "часов"],
                ["минута", "минуты", "минут"],
                ["секунда", "секунды", "секунд"]];

    str = "Между датами прошло";
    var temp = str;
    for (var i = 0; i < 6; ++i) {
        // Отсеивание пустых значений
        if (time[i] == 0) continue;
        str += checkTheWords(time[i], words[i]);
    }
    if(str == temp) {
        str = "Нисколько не прошло";
    }
    return str;
}

// Формирование итоговой строки
function checkTheWords(time, words) {
    var output = " ";

    var lastDigit = time % 10;

    // Условие ниже добавляет правильное имя существительное для падежа.
    if (11 <= getLastDigits(time) && getLastDigits(time) <= 19) {
        output += time + " " + words[2];
    } else if (0 == lastDigit || (5 <= lastDigit && lastDigit <= 9)) {
        output += time + " " + words[2];
    } else if (1 == lastDigit) {
        output += time + " " + words[0];
    } else {
        output += time + " " + words[1];
    }
    return output;
}

function resetTask6() {
    getElem("date1-task6").value = "";
    getElem("date2-task6").value = "";
    print("task6", "");
    print("error-task6", "");
}

// ----------------------Task7-----------------------------
click("task7-button", task7);
click("task7-reset", resetTask7);

var patternTask7 = "[0-9]{4}-([0][1-9]|\
[1][0-2])-([3][0-1]|[1-2][0-9]|[0][1-9])";

function task7() {
    getElem("horoscope-date").pattern = patternTask7;
    var date = getElem("horoscope-date");

    if (date.checkValidity() == false) {
        resetValidation("task7");
        resetValidation("image-task7");
        print("error-task7", date.validationMessage);
    } else {
        resetValidation("error-task7");
        date = date.value.split("-");
        var day = parseInt(date[2]);
        var month = parseInt(date[1]);

        // Массив со знаками гороскопа
        var horoscope = [[''],
                        [20,'Козерог'],
    	                [18,'Водолей'],
    	                [20,'Рыбы'],
    	                [19,'Овен'],
    	                [20,'Телец'],
    	                [21,'Близнецы'],
    	                [22,'Рак'],
    	                [22,'Лев'],
    	                [22,'Дева'],
    	                [23,'Весы'],
    	                [22,'Скорпион'],
    	                [21,'Стрелец']];

        // Условие ниже определяет месяц гороскопа
        if (day > horoscope[month][0]) {
            month = ++month;
            if (month != 12) {
                month %= 12;
            }
        }

        print("task7", horoscope[month][1]);
        print("image-task7", '<img src="img/'+ month +'.jpg">');
    }
}


function resetTask7() {
    getElem("horoscope-date").value = "";
    print("task7", "");
    print("image-task7", "");
    print("error-task7", "");
}

// ----------------------Task8-----------------------------
click("task8-button", task8);
click("task8-reset", resetTask8);

function task8() {
    var height = getElem("chessboard-height");
    var width = getElem("chessboard-width");
    if (height.checkValidity() == false) {
        resetValidation("task8");
        print("error-task8", "Значение высоты: " + height.validationMessage);
    } else if (width.checkValidity() == false) {
        resetValidation("task8");
        print("error-task8", "Значение ширины: " + width.validationMessage);
    } else {
        height = height.value;
        width = width.value;

        // Создание стиля для доски
        var style =
        'style="border: 1px solid black; border-collapse: collapse;"';

        // Создание таблицы для доски
        var output = '<table ' + style + ' >';
        for (i = 0; i < height; ++i) {
            output += '<tr ' + style + ' >';
            for(j = 0; j < width; ++j) {
                var color = "";

                // Изменение цвета ячейки
                (i+j)%2 == 0 ? color = "yellow;" : color = "black;";

                // Отрисовывание клетки
                output += '<td style="width:30px;height:30px;background-color:'
                          + color + '" ></td>';
            }
            output += '</tr>';
        }
        output += '</table>';

        print("task8", output);
    }
}

function resetTask8() {
    getElem("chessboard-height").value = "";
    getElem("chessboard-width").value = "";
    print("task8", "");
    print("error-task8", "");
}

// ----------------------Task9-----------------------------
click("task9-button", task9);
click("task9-reset", resetTask9);

function task9() {
    var porches = getElem("porches-task9");
    var levels = getElem("levels-task9");
    var flats = getElem("flats-task9");
    var numberFlat = getElem("needful-flat-task9");
    if (porches.checkValidity() == false) {
        resetValidation("task9");
        print("error-task9", "Подъезды: " + porches.validationMessage);
    } else if (levels.checkValidity() == false) {
        resetValidation("task9");
        print("error-task9", "Этажи: " + levels.validationMessage);
    } else if (flats.checkValidity() == false) {
        resetValidation("task9");
        print("error-task9", "Квартиры на этаже: " + flats.validationMessage);
    } else if (numberFlat.checkValidity() == false) {
        resetValidation("task9");
        print("error-task9", "№ квартиры: " + numberFlat.validationMessage);
    } else {
        resetValidation("error-task9");
        porches = porches.value;
        flats = flats.value;
        levels = levels.value;
        numberFlat = numberFlat.value;

        // Наибольшее количество квартир в доме
        allFlats = porches * flats * levels;

        // Определение существования искомой квартиры в доме
        if (numberFlat > allFlats) {
            resetValidation("task9");
            print("error-task9", "Введите число от 1 до " + allFlats);
        } else {
            print("task9", findLocation(flats, levels, numberFlat));
        }
    }
}

function findLocation(flats, levels, numberFlat) {

    // Находим количество количество квартир в подъезде
    var flatsInPorche = flats * levels;

    // Искомый подъезд
    var porcheLocation = 0;
    for (var temp = numberFlat; temp > 0; ++porcheLocation) {
        numberFlat = temp;
        temp -= flatsInPorche;
    }

    // Искомый этаж
    var levelLocation = 0;
    for (var temp = numberFlat; temp > 0; ++levelLocation) {
        numberFlat = temp;
        temp -= flats;
    }
    return "Подъезд: " + porcheLocation + ",  этаж: " + levelLocation;
}

function resetTask9() {
    getElem("porches-task9").value = "";
    getElem("levels-task9").value = "";
    getElem("flats-task9").value = "";
    getElem("needful-flat-task9").value = "";
    print("task9", "");
    print("error-task9", "");
}


// ----------------------Task10-----------------------------
click("task10-button", task10);
click("task10-reset", resetTask10);

function task10() {
    var inpObj = getElem("digit-task10");
    if (inpObj.checkValidity() == false) {
        resetValidation("task10");
        print("error-task10", inpObj.validationMessage);
    } else {
        resetValidation("error-task10");

        inpObj = inpObj.value;

        var output = 0;
        output = getSum(inpObj, output);

        print("task10", output);
    }
}

function getSum(inpObj, output) {
    if (inpObj <= 0)
        return output;
    output += inpObj % 10;
    inpObj = Math.floor(inpObj / 10);
    return getSum(inpObj, output);
}

function resetTask10() {
    getElem("digit-task10").value = "";
    print("task10", "");
    print("error-task10", "");
}

// ----------------------Task11-----------------------------
click("task11-reset", resetTask11);

function task11() {
    var inpObj = getElem("links-task11").value;

    // Разбирание строки на отдельные ссылки
    var links = inpObj.split(",");
    var output = "";

    for (var i = 0; i < links.length; ++i) {

        // Разбирание на протокол и тело ссылки
        links[i] = links[i].trim().split("//");

        // Замена местами протокола и тела ссылки для сортировки
        var temp = links[i][0];
        links[i][0] = links[i][1];
        links[i][1] = temp;
    }

    links.sort();

    // Создание списка
    output = "<ol>";
    for (var i = 0; i < links.length; ++i) {
        if (typeof links[i][0] != "undefined" &&
            typeof links[i][1] != "undefined") {
            output += '<li><a href="' + links[i][1] +
                      "//" + links[i][0] + '">' + links[i][0] + '</a></li>';
        }
    }

    print("task11", output + "</ol>");
}

function resetTask11() {
    getElem("links-task11").value = "";
    print("task11", "");
    print("error-task11", "");
}
