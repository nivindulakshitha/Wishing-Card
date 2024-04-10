var currentDoc = null;

$(document).ready(function () {
    const docId = window.location.hash.substring(1);

    if (docId !== "") {
        updateDoc(docId)
    } else {
        console.log("URL doesn't contain the expected part.");
    }

    $('img').on('contextmenu', function (e) {
        e.preventDefault();
    });

    $('img').on('dragstart', function () {
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
    $(".container").hide();

    $("button#card-creator").click(async function () {
        /* $(".welcome-text").css("display", "none");
        $(".container").css("display", "flex"); */
        await fadeOut(document.querySelector(".welcome-text")).then(() => {
            fadeIn(document.querySelector(".container"));
        });

        $("#create").click();

        $('img.cover').css({
            "-webkit-filter": "blur(5px)",
            "filter": "blur(5px)"
        });
    });

    $("button#go-back").click(async function () {
        $("#card").removeClass("open");
        /*  $(".container").css("display", "none");
         $(".welcome-text").css("display", "flex"); */

        await fadeOut(document.querySelector(".container")).then(async () => {
            window.location.reload();
            await fadeIn(document.querySelector(".welcome-text")).then(() => {
            });
        });

        $('img.cover').css({
            "-webkit-filter": "blur(0px)",
            "filter": "blur(0px)"
        });
    });

    $("button#card-opener").click(async function () {
        const docId = window.location.hash.substring(1);

        if (docId !== "") {
            updateDoc(docId)
        } else {
            console.log("URL doesn't contain the expected part.");
        }

        /* $(".welcome-text").css("display", "none");
        $(".container").css("display", "flex"); */

        await fadeOut(document.querySelector(".welcome-text")).then(() => {
            fadeIn(document.querySelector(".container"));
        });

        $('img.cover').css({
            "-webkit-filter": "blur(5px)",
            "filter": "blur(5px)"
        });
    });

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
            mylink = "https://hasna.netlify.app/#" + response.id;
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
        var message = successful ? 'යොමුව පිටපත් කෙරුණි. එය හිත මිතුරන් අතරේ බෙදා හරින්න' : 'යොමුව පිටපත් කිරීමට අසමත් විය. නැවත උත්සහ කරන්න.';
        alert(message);
        if (successful) {
            window.location.reload();
        }
    } catch (error) {
        console.error('Unable to copy text: ', error);
        alert('යොමුව පිටපත් කිරීමට අසමත් විය. නැවත උත්සහ කරන්න.');
    }

    document.body.removeChild(textarea);
}

async function fadeIn(element) {
    element.style.display = 'flex'; // Change display property to flex
    element.style.opacity = 0;

    return new Promise((resolve) => {
        function fade() {
            let currentOpacity = parseFloat(element.style.opacity);
            if (currentOpacity >= 1) {
                resolve();
                return;
            }
            element.style.opacity = currentOpacity + 0.1;
            requestAnimationFrame(fade);
        }
        fade();
    });
}

async function fadeOut(element) {
    element.style.opacity = 1;

    return new Promise((resolve) => {
        function fade() {
            let currentOpacity = parseFloat(element.style.opacity);
            if (currentOpacity <= 0) {
                element.style.display = 'none';
                resolve();
                return;
            }
            element.style.opacity = currentOpacity - 0.1;
            requestAnimationFrame(fade);
        }
        fade();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementsByTagName('audio')[0];
    audio.play();
    document.removeEventListener('DOMContentLoaded', arguments.callee);
});

document.addEventListener('click', function (event) {
    document.getElementsByTagName('audio')[0].play();
    event.preventDefault();
})