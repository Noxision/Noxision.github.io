$(document).ready(function () {
    $(".header-content").click(function () {
        $(".menu-items").slideToggle("slow");
    });

    $(".menu-item").click(function () {
        $(".header-data").text($(this).text());
        $(".menu-items").slideToggle("slow");
    });
});
