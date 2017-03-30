$(document).ready(function () {
    $(".header-content").click(function (e) {
        e.stopPropagation();
        $(".menu-items").slideToggle("slow");
    });

    $(".menu-item").click(function () {
        $(".header-data").text($(this).text());
        $(".menu-items").slideToggle("slow");
    });

    $(window).click(function () {
        $(".menu-items").slideUp("slow");
    });
});
