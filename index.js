var currentDoc = null;

$(document).ready(function () {
    const docId = window.location.hash.substring(1);

    if (docId !== "") {
        updateDoc(docId)
    } else {
        console.log("URL doesn't contain the expected part.");
    }

    $('img, video').on('contextmenu', function (e) {
        e.preventDefault();
    });

    $('img, video').on('dragstart', function () {
        return false;
    });
    
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

    $('#heart').on('click', async function () {
        var fill = $(this).attr('fill');
        if (fill == 'none') {
            $(this).attr('fill', 'red');
            await updateLikes(currentDoc._id, true);
            updateDoc(currentDoc._id)
        } else {
            $(this).attr('fill', 'none');
            await updateLikes(currentDoc._id, false);
            updateDoc(currentDoc._id)
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

    $("button#card-creator").click(function () {
        $(".welcome-text").fadeOut("slow", function () {
            $(".container").fadeIn("slow");
            $("#create").click();
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

    $("button#go-back").click(function () {
        $("#card").removeClass("open");
        $(".container").fadeOut("slow", function () {
            $(".welcome-text").fadeIn("slow");
        });

        $({ blurRadius: 1 }).animate({ blurRadius: 0 }, {
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

    $("button#card-opener").click(function () {
        const docId = window.location.hash.substring(1);

        if (docId !== "") {
            updateDoc(docId)
        } else {
            console.log("URL doesn't contain the expected part.");
        }
        
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

    $("#create").on('click', function () {
        $("#details-box").removeClass("preview");
        $("#details-box").find("[name='title'], textarea, [name='name']").val('');

        $("#details-box").find("input[name='title'], textarea").each(function () {
            if ($(this).val() === '') {
                $(this).css('border-color', 'red');
            } else {
                $(this).css('border-color', '#ccc');
            }
        });

        $("#create").hide();
        $("#share").show();
    });

    $("#share").on('click', async function () {
        var allFilled = true;
        $("#details-box").find("input[name='title'], textarea, input[name='name']").each(function () {
            if ($(this).val() === '') {
                $(this).css('border-color', 'red');
                allFilled = false;
            } else {
                $(this).css('border-color', '#ccc');
            }
        });

        if (!allFilled) {
            return;
        }

        $("#share").html('නිර්මාණය කරමින්...');
        if (mylink === '') {
            await newDocSubmit($("input[name='name']").val(), $("input[name='title']").val(), $("textarea[name='message']").val());
        } else {
            copyToClipboard(mylink);
        }
        $("#share").html('යොමුව පිටපත් කරගන්න');
    });

});

var mylink = '';

const newDocSubmit = async (username, title, message) => {
    await $.ajax({
        url: 'https://dsapi.netlify.app/api/reg',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            username: nameFormater(username.trim()),
            title: title.trim(),
            message: message.trim()
        }),
        success: function (response) {
            alert('සුභ පැතුම් පත සාර්ථකව නිර්මාණය කරන ලදි. එහි යොමුව පිටපත් කරගෙන බෙදා හරින්න.');
            mylink = "http://192.168.1.2:5500/#" + response.id;
            copyToClipboard(mylink)
        },
        error: function (error) {
            alert('නිර්මාණය කිරීමට නොහැකි විය. නැවත උත්සහ කරන්න.');
            $("#share").html('නිර්මාණය කරන්න');
        }
    });
}

const updateDoc = async (docId) => {
    getDoc(docId).then((doc) => {
        if (doc) {
            currentDoc = doc.doc;
            $("#card-opener").show();
            $("#details-box").find("[name='title']").val(doc.doc.title);
            $("#details-box").find("textarea").val(doc.doc.message);
            $("#details-box").find("[name='name']").val(doc.doc.username);
            $("#likes-count").find("span").text(formatLikes(doc.doc.likes));
            $("#details-box").addClass("preview");
        } else {
            $("card-opener").hide();
        }
    });
}

const formatLikes = (likes) => {
    if (likes >= 1 && likes <= 9) {
        return '0' + likes;
    }
    return likes;
}


const getDoc = async (docId) => {
    console.log(docId)
    var doc = null;
    await $.ajax({
        url: 'https://dsapi.netlify.app/api/find/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            docId: docId
        }),
        success: function (response) {
            doc = response;
        },
        error: function (error) {
            console.error(error);
        }
    });
    return doc;
}



const updateLikes = async (docId, likes) => {
    await $.ajax({
        url: 'https://dsapi.netlify.app/api/like/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            docId: docId,
            likes: likes ? 1 : -1
        }),
        success: function (response) {
            $("#likes-count").find("span").text(response.likes);
        },
        error: function (error) {
            console.error(error);
        }
    });

}

function nameFormater(name) {
    return "- " + name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); })
}

const copyToClipboard = (text) => {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();

    try {
        var successful = document.execCommand('copy');
        var message = successful ? 'යොමුව පිටපත් කෙරුණි. එය හිත මිතුරන් අතරේ බෙදා හරින්න. ඔබේ නිර්මාණය වෙත ඔබව ගෙන යනු ඇති.' : 'යොමුව පිටපත් කිරීමට අසමත් විය. නැවත උත්සහ කරන්න.';
        alert(message);
        if (successful) {
            window.location.assign(mylink);
            window.location.reload();
        }
    } catch (error) {
        console.error('Unable to copy text: ', error);
        alert('යොමුව පිටපත් කිරීමට අසමත් විය. නැවත උත්සහ කරන්න.');
    }

    document.body.removeChild(textarea);
}