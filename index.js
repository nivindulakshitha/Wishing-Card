$(document).ready(function () {
    $("#card").click(function () {
        $(this).toggleClass("open");
    });

    $(".container").tilt({
        maxTilt: 10,
        perspective: 1200,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        scale: 1.05,
        speed: 1000,
        transition: true,
        disableAxis: null,
        reset: false,
        glare: false,
    });
});