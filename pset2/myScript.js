//----------------------Task1-----------------------------

function task1() {
    var sum = 0;
    for (i = -1000; i <= 1000; ++i)
        sum += i;
    return sum;
}

//----------------------Task2-----------------------------

function task2() {
    var sum = 0;
    for (i = -1000; i <= 1000; ++i) {
        if (Math.abs(i)%10 == 2 || Math.abs(i)%10 == 3 || Math.abs(i)%10 == 7) {
            sum += i;
        }
    }
    return sum;
}

//----------------------Task3-----------------------------

function task3() {
    var string = "", subString = "";
    for (i = 0; i < 50; ++i) {
        for (j = 0; j <= i; ++j) {
            subString += "*";
        }
        string += subString + "<br>";
        subString = "";
    }
    return string;
}

//----------------------Task4-----------------------------

function task4() {
    var inpObj = document.getElementById("inpTask4");
    if (inpObj.checkValidity() == false) {  //Проверка введенного числа
        document.getElementById("Task4").innerHTML = inpObj.validationMessage;
    } else {
        inpObj = inpObj.value;
        var output = "";
        var hours = Math.floor(inpObj/3600);    //Нахождене часов, минут, секунд
        var mints = Math.floor((inpObj - hours*3600)/60);
        var secds = Math.floor(inpObj - hours*3600 - mints*60);

        output  += checkTask4(hours)
                + ":" + checkTask4(mints)
                + ":" + checkTask4(secds);

        document.getElementById("Task4").innerHTML = output;
    }
}

function checkTask4(n) {   //Добавление 0 к значению в итоговую строку, если значение имеет один символ
    var str = "";
    if (n < 10) {
        str += "0" + n;
    } else {
        str += n;
    }
    return str;
}

function resetTask4() {    //Откатываем все как было
    document.getElementById("inpTask4").value = "";
    document.getElementById("Task4").innerHTML =
    "Пользователь вводит время в секундах. Вывести в формате: ч:мин:сек (01:05:20).";
}

//----------------------Task5-----------------------------

function task5() {
    var inpObj = document.getElementById("inpTask5");
    if (inpObj.checkValidity() == false) {  //Проверка введенного числа
        document.getElementById("Task5").innerHTML = inpObj.validationMessage;
    } else {
        inpObj = inpObj.value;
        var output = "";

        if (11 <= inpObj && inpObj <=19) {  //Выставление имя существительного относительно падежа
            output += inpObj + " лет";
        } else if (0 == inpObj%10 || (5 <= inpObj%10 || inpObj&10 <=9)) {
            output += inpObj + " лет";
        } else if (1 == inpObj%10) {
            output += inpObj + " год";
        } else {
            output += inpObj + " года";
        }

    document.getElementById("Task5").innerHTML = output;
    }
}

function resetTask5() {
    document.getElementById("inpTask5").value = "";   //Откатываем все как было
    document.getElementById("Task5").innerHTML =
    'Для указанного возраста студента вывести фразу вида "22 года" ( 1 год, 20 лет....).';
}

//----------------------Task6-----------------------------

function task6() {
    var date1 = document.getElementById("inpTask6-1");
    var date2 = document.getElementById("inpTask6-2");

    if (date1.checkValidity() == false) {   //Проверка введенных дат на соответствие шаблону
    document.getElementById("Task6").innerHTML = "Date 1: " + date1.validationMessage;
    } else if (date2.checkValidity() == false) {
    document.getElementById("Task6").innerHTML = "Date 2: " + date2.validationMessage;
    } else {
        date1 = Date.parse(date1.value)/1000;   //Получение времени в секундах
        date2 = Date.parse(date2.value)/1000;

        var time = [];  //Массив итоговых значений [год, месяц, день, час, минута, секунда]
        var str = "";

        var odds = Math.abs(date1 - date2); //Определение разницы между датами
        time = fillTheArray(odds, time);    //Заполнение итогового массива

        document.getElementById("Task6").innerHTML = fillTheStr(str, time); //Создание строки с итоговыми значениями
  }
}

function fillTheArray(odds, time) {
    time[0] = Math.floor(odds/31536000);    //Определения количества лет

    time[1] = Math.floor((odds - time[0] * 31536000) / 2628000);    //Определения количества месяцев

    time[2] = Math.floor((odds - time[0] * 31536000
                               - time[1] * 2628000) / 86400);   //Определения количества дней

    time[3] = Math.floor((odds - time[0] * 31536000
                               - time[1] * 2628000
                               - time[2] * 86400) / 3600);  //Определения количества часов

    time[4] = Math.floor((odds - time[0] * 31536000
                               - time[1] * 2628000
                               - time[2] * 86400
                               - time[3] * 3600) / 60); //Определения количества минут

    time[5] =  Math.floor(odds - time[0] * 31536000
                               - time[1] * 2628000
                               - time[2] * 86400
                               - time[3] * 3600
                               - time[4] * 60); //Определения количества секунд
    return time;
}

function fillTheStr(str, time) {
    var words = [["год", "года", "лет"],  //Массив имя существительных для формирования итоговой строки
                ["месяц", "месяца", "месяцев"],
                ["день", "дня", "дней"],
                ["час", "часа", "часов"],
                ["минута", "минуты", "минут"],
                ["секунда", "секунды", "секунд"]];

    str = "Между датами прошло";
    var temp = str;
    for (i = 0; i < 6; ++i) {
        if (time[i] != 0)   //Отсеивание пустых значений
        str += checkTheWords(time[i], words[i]);
    }
    if(str == temp)   //Проверка на одинакововведенное время
        str = "Нисколько не прошло";
    return str;
}

function checkTheWords(time, words) {   //Формирование итоговой строки
    var output = " ";
    if (11 <= time && time <=19) {
        output += time + " " + words[2];
    } else if (0 == time%10 || (5 <= time%10 || time&10 <=9)) {
        output += time + " " + words[2];
    } else if (1 == time%10) {
        output += time + " " + words[0];
    } else {
        output += time + " " + words[1];
    }
    return output;
}

function resetTask6() {
    document.getElementById("inpTask6-1").value = "";
    document.getElementById("inpTask6-2").value = "";
    document.getElementById("Task6").innerHTML =
    'Пользователь вводит две даты (в формате "October 13, 2014 11:13:00"). Вычислить промежуток времени прошедший между датами.';
}

//----------------------Task7-----------------------------

function task7() {
    var date = document.getElementById("inpTask7");

    if (date.checkValidity() == false) {
        document.getElementById("Task7-1").innerHTML = date.validationMessage;
    } else {
        date = date.value;
        date = date.split("-");
        var day = parseInt(date[2]);
        var month = parseInt(date[1]);

        var horoscope = [[''], //Массив со знаками гороскопа
                        [19,'Козерог'],
    	                [18,'Водолей'],
    	                [20,'Рыбы'],
    	                [19,'Овен'],
    	                [20,'Телец'],
    	                [21,'Близнецы'],
    	                [22,'Рак'],
    	                [22,'Лев'],
    	                [22,'Дева'],
    	                [22,'Весы'],
    	                [22,'Скорпион'],
    	                [21,'Стрелец']];

        if (day > horoscope[month][0])  //Определение месяца гороскопа
            month = ++month%12; //Выставление количества месяцев не более 12

        document.getElementById("Task7-1").innerHTML = horoscope[month][1];
        document.getElementById("Task7-2").innerHTML = '<img src="img/'+ month +'.jpg">';
    }
}


function resetTask7() {
    document.getElementById("inpTask7").value = "";
    document.getElementById("Task7-1").innerHTML =
    'Пользователь вводит дату в формате 2014-12-27, а возвращает знак зодиака в этот день (с картинкой).';
    document.getElementById("Task7-2").innerHTML = '';
}

//----------------------Task8-----------------------------

function task8() {
    var h = document.getElementById("inpTask8-1");
    var w = document.getElementById("inpTask8-2");
    if (h.checkValidity() == false) {
        document.getElementById("Task8").innerHTML = "Date 1: " + h.validationMessage;
    } else if (w.checkValidity() == false) {
        document.getElementById("Task8").innerHTML = "Date 2: " + w.validationMessage;
    } else {
        h = h.value;
        w = w.value;
        var style =
        'style="border: 1px solid black; border-collapse: collapse;"';  //Создание стиля для доски

        var output = '<table ' + style + ' >';  //Создание таблицы для доски
        for (i = 0; i < h; ++i) {   //Отрисовываниие рядов
            output += '<tr ' + style + ' >';
            for(j = 0; j < w; ++j) {    //Отрисовывание строк
                var color = "";
                (i+j)%2 == 0 ? color = "yellow;" : color = "black;";    //Изменение цвета ячейки
                output +=
                '<td style="width:50px;height:50px;background-color:' + color + '" ></td>'; //Отрисовывание клетки
            }
            output += '</tr>';
        }
        output += '</table>';

        document.getElementById("Task8").innerHTML = output;
    }
}

function resetTask8() {
    document.getElementById("inpTask8-1").value = "";
    document.getElementById("inpTask8-2").value = "";
    document.getElementById("Task8").innerHTML = '';
}

//----------------------Task9-----------------------------

function task9() {
    var porches = document.getElementById("inpTask9-1");
    var flats = document.getElementById("inpTask9-3");
    var levels = document.getElementById("inpTask9-2");
    var numberFlat = document.getElementById("inpTask9-4");
    if (porches.checkValidity() == false) {
        document.getElementById("Task9").innerHTML = "Input 1: " + porches.validationMessage;
    } else if (flats.checkValidity() == false) {
        document.getElementById("Task9").innerHTML = "Input 3: " + flats.validationMessage;
    } else if (levels.checkValidity() == false) {
        document.getElementById("Task9").innerHTML = "Input 2: " + levels.validationMessage;
    } else if (numberFlat.checkValidity() == false) {
        document.getElementById("Task9").innerHTML = "Input 4: " + numberFlat.validationMessage;
    } else {
        porches = porches.value;    //Количество подъездов
        flats = flats.value;    //Количество квартир в пролете
        levels = levels.value;  //Количество этажей
        numberFlat = numberFlat.value;  //Номер нужной квартиры

        allNumbers = porches * flats * levels;  //Наибольшее количество квартир в доме

        if (numberFlat > allNumbers)    //Определение существования искомой квартиры в доме
        document.getElementById("Task9").innerHTML = "Такой квартиры в доме нет!";
        else {
            var output = "";
            output = findLocation(output, porches, flats, levels, numberFlat);  //
            document.getElementById("Task9").innerHTML = output;
        }
    }
}

function findLocation(output, porches, flats, levels, numberFlat) {
    var flatsInPorche = flats * levels; //Находим количество количество квартир в подъезде
    var porcheLocation = 0; //Искомый подъезд
    for(temp = numberFlat; temp > 0; ++porcheLocation) {
        numberFlat = temp;
        temp -= flatsInPorche;
    }
    var levelLocation = 0;  //Искомый этаж
    for (temp = numberFlat; temp > 0; ++levelLocation) {
        numberFlat = temp;
        temp -= flats;
    }
    return output = "Подъезд: " + porcheLocation + " этаж: " + levelLocation;
}

function resetTask9() {
    document.getElementById("inpTask9-1").value = "";
    document.getElementById("inpTask9-2").value = "";
    document.getElementById("inpTask9-3").value = "";
    document.getElementById("inpTask9-4").value = "";
    document.getElementById("Task9").innerHTML =
    'Определить номер подъезда и этаж по номеру квартиры.';
}


//----------------------Task10-----------------------------

function task10() {
    var inpObj = document.getElementById("inpTask10");
    if (inpObj.checkValidity() == false) {
        document.getElementById("Task10").innerHTML = inpObj.validationMessage;
    } else {
        inpObj = inpObj.value;
        var output = 0;
        output = getSum(inpObj, output);

        document.getElementById("Task10").innerHTML = output;
    }
}

function getSum(inpObj, output) {
    if (inpObj <= 0)
        return output;
    var digit = inpObj%10;
    output += digit;
    inpObj = Math.floor(inpObj/10);
    return getSum(inpObj, output);
}

function resetTask10() {
    document.getElementById("inpTask10").value = "";
    document.getElementById("Task10").innerHTML = 'Найти сумму цифр введённого числа.';
}

//----------------------Task11-----------------------------

function task11() {
    var inpObj = document.getElementById("inpTask11").value;
    var links = inpObj.split(",");  //Разбирание строки на отдельные ссылки
    var output = "";

    for (i = 0; i < links.length; ++i) {
        links[i] = links[i].trim().split("//"); //Разбирание протокол и тело ссылки
        var temp = links[i][0]; //Замена местами протокола и тела ссылки для сортировки
        links[i][0] = links[i][1];
        links[i][1] = temp;
    }

    links.sort();

    output = "<ol>";    //Создание списка
    for (i = 0; i < links.length; ++i) {
        output += '<li><a href="' + links[i][1] + "//" + links[i][0] + '">' + links[i][0] + '</a></li>';
    }

    document.getElementById("Task11").innerHTML = output + "</ol>";
}

function resetTask11() {
    document.getElementById("inpTask11").value = "";
    document.getElementById("Task11").innerHTML =
    'Дан некий textarea, в который пользователь вводит ссылки через запятую. Когда textarea станет неактивным удалить http:// и https:// из ссылок и вывести их отсортированным по алфавиту списком ссылок.';
}
