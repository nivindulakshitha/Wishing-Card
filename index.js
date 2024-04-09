$(document).ready(function () {

    $(document).click(function (event) {
        if (!$(event.target).closest('#card').length) {
            $("video").style.filter = "blur(10px)";
            $("#card").removeClass("open");
        }
    });

    $("#card").click(function (event) {
        $("#card").addClass("open");
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

$(document).ready(function () {
    var audioElement = document.createElement('audio');
    audioElement.src = './music.mp3';
    audioElement.loop = true;
    audioElement.play();
    audioElement.addEventListener('timeupdate', function () {
        var buffer = 1;
        if (this.currentTime > this.duration - buffer) {
            this.currentTime = 0;
            this.play();
        }
    }, false);
});

$(document).ready(function () {
    $(".container").hide();

    $("button").click(function () {
        $(".welcome-text").fadeOut("slow", function () {
            $(".container").fadeIn("slow");
        });
    });
});