$(document).ready(function () {
    var isEntered = false;
    $("#card").on("click", function () {
        var card = $(this);

        if (!isEntered) {
            isEntered = true;
            $("#image-box img").fadeOut(50);
            setTimeout(function () {
                $("#image-box").css({ 'background-image': 'url("./1st.jpg")', 'transform': 'scaleX(-1)' });
                $("#image-box img").fadeIn(200).css({ 'transform': 'rotateY(180deg)' });
            }, 50); // adjust time as needed
        } else {
            isEntered = false;
            $("#image-box img").fadeOut(50);
            $("#image-box").css({ 'background-image': 'url("./1st.jpg")', 'transform': 'scaleX(1)' });
            setTimeout(function () {
                $("#image-box img").css({ 'transform': 'rotateY(0deg)' }).fadeIn(200);
            }, 50); // adjust time as needed
        }
        card.toggleClass("open");
    });
});


$(".container").tilt({
    maxTilt: 25,
    perspective: 1400,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    scale: 1.1,
    speed: 300,
    transition: true,
    disableAxis: null,
    reset: true,
    glare: false,
    maxGlare: 1
});