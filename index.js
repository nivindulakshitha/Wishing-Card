$(document).ready(function () {

    $(document).click(function (event) {
        if (!$(event.target).closest('#card').length) {
            $("#card").removeClass("open");
        }
    });

    $("#card").click(function (event) {
        $("#card").addClass("open");
    });

    $(".container").tilt({
        maxTilt: 5,
        perspective: 1200,
        easing: "cubic-bezier(.03,.98,.52,.99)",
        scale: 1,
        speed: 1000,
        transition: true,
        disableAxis: null,
        reset: false,
        glare: false,
    });

    $('#heart').on('click', function () {
        var fill = $(this).attr('fill');
        if (fill == 'none') {
            $(this).attr('fill', 'red');
        } else {
            $(this).attr('fill', 'none');
        }
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
    // Create audio element
    var audioElement = document.createElement('audio');
    audioElement.src = './music.mp3';
    audioElement.loop = true;

    // Function to play audio
    function playAudio() {
        audioElement.play();
        // Add timeupdate event listener to handle loop
        audioElement.addEventListener('timeupdate', function () {
            var buffer = 1;
            if (this.currentTime > this.duration - buffer) {
                this.currentTime = 0;
                this.play();
            }
        }, false);
        // Remove the event listener after audio starts playing
        $(document).off('click', playAudio);
    }

    // Add click event listener to play audio
    $(document).on('click', playAudio);
});


$(document).ready(function () {
    $(".container").hide();

    $("button#card-opener").click(function () {
        $(".welcome-text").fadeOut("slow", function () {
            $(".container").fadeIn("slow");
        });

        $({ blurRadius: 0 }).animate({ blurRadius: 1 }, {
            duration: 1000,
            easing: 'swing', // or another easing function
            step: function () {
                $('video').css({
                    "-webkit-filter": "blur(" + this.blurRadius + "px)",
                    "filter": "blur(" + this.blurRadius + "px)"
                });
            }
        });
    });

    $(document).ready(function () {
        $("input[name='title']").on('input', function () {
            var input = $(this);
            if (input.val().length > 26) {
                input.css('border-color', 'red');
                input.val(input.val().substring(0, 26)); // limit the input to 26 characters
                alert('අකුරු ප්‍රමාණය සීමා කර ඇත.'); // notify the user
            } else {
                input.css('border-color', '#aaa');
            }
        });

        $("textarea[name='message']").on('input', function () {
            var input = $(this);
            if (input.val().length > 300) {
                input.css('border-color', 'red');
                input.val(input.val().substring(0, 300)); // limit the input to 26 characters
                alert('අකුරු ප්‍රමාණය සීමා කර ඇත.'); // notify the user
            } else {
                input.css('border-color', '#aaa');
            }
        });
    });

    $("#share").on('click', function () {
        var button = $(this);
        button.html('නිර්මාණය කරමින්...');
        alert("ඔබේ සුභ පැතුම් පත නිර්මාණය කර අවසන්. එහි යොමුව පිටපත් කරගෙන බෙදා හරින්න.");
        var textToCopy = 'Your text to copy';
        var textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();

        try {
            var successful = document.execCommand('copy');
            var message = successful ? 'Text copied successfully.' : 'Copying failed. Please try again.';
            alert(message);
        } catch (error) {
            console.error('Unable to copy text: ', error);
            alert('Copying failed. Please try again.');
        }

        document.body.removeChild(textarea);
    });

});