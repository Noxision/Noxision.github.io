$(document).ready(function () {
    $(".header-content").on("click", function (e) {
        e.stopPropagation();
        var items = $(".menu-items");
        if (!items.is(":animated")) {
            items.slideToggle("slow");
        }
    });

    $(".menu-item").on("click", function () {
        $(".header-data").text($(this).text());
        $(".menu-items").slideUp("slow");
    });

    $(window).on("click", function () {
        $(".menu-items").slideUp("slow");
    });
});
