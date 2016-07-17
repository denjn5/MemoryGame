
// start 1 second over what you want
function gameTimer(timerLength) {

    setInterval(function () {
        timerLength--;
        if (timerLength >= 0) {
            $("#timer").text(timerLength)
        } else {
            $("#done").hide();
            $("#message").text("Uh oh...  You may not be the best. Click 'Restart' to try again.");
            $("#score").text("0");
            clearInterval(timerLength);
        }
    }, 1000);
}

function gameDone(msg) {
    $("#score").text($("#timer").text())
    alert("Nice job! You don't stink.");
};

function setUpPage() {
    gameTimer(61);
    $("#message").text("You 'da best?");
    //restartForce();
}


$(document).ready(function () {
    setUpPage();
});
