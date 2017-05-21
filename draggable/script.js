$(document).ready(function () {
    var bubble = {};
    var c = $('.container');

    /*if(bubble.get().bubbles > 0) {
        $.each(bubble.get().bubbles, function (index, value) {
            bubble.render();
        })
    }*/

    bubble.count = 1;

    c.on('dblclick', function (e) {
        var x = e.pageX + 'px';
        var y = e.pageY + 'px';

        bubble.render(x, y);
        console.log(e.pageY, e.pageX);
        console.log($('#draggable' + bubble.count).position());

    });

    c.on('dblclick', '.drag', function (e) {
        e.stopPropagation();

        var input = '<input type="text" size="15">';
        var text = $(this).text();

        $(this).text('').append(input).find('input').val(text).on('mousedown dblclick', function () {
            $(this).val($(this).val());
            return false;
        }).focus();
        $(this).find('input').on('blur', function () {
            $(this).parent().off('keydown').text($(this).val());
        });

        $(this).on('keydown', function (e) {
            $(this).off('focusout');
            if (e.which == 13) {
                $(this).text($(this).find('input').val());
            } else if (e.which == 27){
                $(this).text('');
            }
        });
    });

    bubble.put = function (id, x, y, data) {
        var content = this.get();
        content.bubbles[id] = {'width' : x, 'height' : y, 'data' : data};
        content.nextCount = ++this.count;
        console.log(JSON.stringify(content));
        sessionStorage.setItem('content', JSON.stringify(content));
    };

    bubble.get = function () {
        var content = JSON.parse(sessionStorage.getItem('content'));

        if(content){
            if(content.nextCount) {
                this.count = content.nextCount;
            }
            console.log(content);
            return content;
        } else {
         return {'bubbles' : {}};
        }
    };

    bubble.render =  function(x, y) {
        c.append('<div class="drag" id="draggable' + this.count + '"></div>');

        $('#draggable' + this.count).css({
            top: y,
            left: x,
            position: 'absolute'
        }).draggable({
            cursor: "move",
            cursorAt: { top: 10, left: 50 },
            containment: '.container',
            scroll: false
        });

        this.put(this.count, $('#draggable' + this.count).position().left, $('#draggable' + this.count).position().top, '');
    };

}).disableSelection();
