$(document).ready(function () {
    var buttonGoTop = $("#button-go-top");

    $(window).scroll(function () {
        if (document.body.scrollTop > 20) {
            buttonGoTop.show();
        } else {
            buttonGoTop.hide();
        }
    });

    buttonGoTop.click(function () {
        $("html, body").animate({scrollTop: 0}, "slow");
    });

    $(".nav-item").on('click', function (e) {
        var scrollTo = $(this.getAttribute("href"));
        var height = scrollTo.offset().top -
            ($(window).height() - scrollTo.outerHeight(true)) / 2;
        $("html, body").animate({scrollTop: height}, "slow");
        e.preventDefault();
    });
});
