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

    $(".nav-item").click(function () {
        var scrollTo = $(this.getAttribute("href"));
        $("html, body").animate({
            scrollTop: scrollTo.offset().top -
                       ($(window).height() -
                       scrollTo.outerHeight(true)) / 2
        }, "slow");
        return false;
    });
});
