let workoutStopwatch;
let workoutTime = 0;

let currentRestPeriod = 0;
let currentRestElement;
let currentRestTimer;

function startWorkout_Clicked() {
    $("#StartWorkoutButton").fadeOut(100, function () {
        workoutTime = 0;
        updateWorkoutTime();

        workoutStopwatch = setInterval(() => {
            workoutTime++;
            updateWorkoutTime();
        }, 1000);
        $("#StartWorkoutButton").removeClass("d-block");
        $("#PauseStopDiv").addClass("d-table").hide().fadeIn(100);
    });
}

function stopWorkout_Clicked() {
    $("#PauseStopDiv").fadeOut(100, function () {
        clearInterval(workoutStopwatch);
        $("#PauseStopDiv").removeClass("d-table");
        $("#StartWorkoutButton").addClass("d-block").hide().fadeIn(100);
    });
}

function pauseWorkout_Clicked() {
    const pauseButton = $("#PauseWorkoutButton");
    if (pauseButton.text() === "Pause") {
        pauseButton.text("Resume");
        clearInterval(workoutStopwatch);
    } else {
        pauseButton.text("Pause");
        workoutStopwatch = setInterval(() => {
            workoutTime++;
            updateWorkoutTime();
        }, 1000);
    }
}

function updateWorkoutTime() {
    const minutes = Math.floor(workoutTime / 60);
    const seconds = workoutTime % 60;

    const minuteString = minutes < 10 ? "0" + minutes : minutes;
    const secondString = seconds < 10 ? "0" + seconds : seconds;
    const resultString = `${minuteString}:${secondString}`;

    $("#WorkoutTime").text(resultString);
}

function startRest_Clicked(sender) {
    if (!currentRestElement) {
        startRestPeriod(sender);
    } else if (currentRestElement[0] === $(sender)[0]) {
        resetRestPeriod();
    } else {
        resetRestPeriod();
        startRestPeriod(sender);
    }
}

function resetRestPeriod() {
    clearInterval(currentRestTimer);
    currentRestElement.removeClass("btn-danger").addClass("btn-primary").text("Start Rest");
    currentRestElement = null;
}

function startRestPeriod(element) {
    currentRestPeriod = $(element).data("restperiod");

    currentRestElement = $(element);
    currentRestElement.removeClass("btn-primary").addClass("btn-danger").text(currentRestPeriod);
    currentRestTimer = setInterval(() => {
        currentRestPeriod--;
        currentRestElement.text(currentRestPeriod);
        if (currentRestPeriod === 0) {
            resetRestPeriod();
        }
    }, 1000);
}

