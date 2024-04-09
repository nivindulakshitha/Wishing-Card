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

$(document).ready(function () {

    // Detect device type and change video source accordingly
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    var videoElement = document.querySelector('video'); // replace 'video' with your video element's selector

    if (isMobile) {
        videoElement.src = './GDUP7Rm9ZOOr5NgCAJBFSaAPT_sXbmdjAAAF.mp4';
    } else {
        videoElement.src = './HQ video.mp4';
    }
});
