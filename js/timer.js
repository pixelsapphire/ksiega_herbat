var stop = false;
const resultTimer = (text) => document.getElementById("output_timer").innerHTML = text,

    secToTime = (sec) => {
        var minutes = Math.floor(sec / 60),
            seconds = sec % 60;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        return minutes + ":" + seconds;
    },

    timer = (time) => {
        var timer = setInterval(() => {
            resultTimer(secToTime(time));
            if (time == 0) {
                clearInterval(timer);
                if (document.getElementById("timer_alarm").checked) {
                    new Audio('media/alarm.mp3').play();
                }
            }
            if (stop) {
                clearInterval(timer);
                resultTimer(secToTime(0));
                stop = false;
            }
            time--;
        }, 1000);
    },

    timerFromInput = () => {
        var time = document.getElementById("timer_input").value.replace(",", ".");
        if (isNaN(time) || time == "" || Math.round(time * 60) <= 0) {
            resultTimer("Podany czas jest nieprawidłowy.");
            return;
        }

        time = Math.round(time * 60);
        resultTimer(secToTime(time));
        time--;

        timer(time);
    },

    timerFromLink = (minutes) => {
        document.getElementById("timer_input").value = minutes;
        timer(minutes * 60);
    },

    timerStop = () => {
        stop = true;
        resultTimer(secToTime(0));
    };