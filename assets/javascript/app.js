// FireBase Link =======================================================================================================

var config = {
    apiKey: "AIzaSyDms5AHA1Q__tuwAbyrwJVo3krAEoqMI6E",
    authDomain: "train-scheduler-7f64d.firebaseapp.com",
    databaseURL: "https://train-scheduler-7f64d.firebaseio.com",
    projectId: "train-scheduler-7f64d",
    storageBucket: "train-scheduler-7f64d.appspot.com",
    messagingSenderId: "130680246488"
};
firebase.initializeApp(config);
var database = firebase.database();
var trainsRef = firebase.database().ref().child('trains');
// Global Variables ====================================================================================================

var trainName;
var destination;
// var nextTrain;
var firebase;
var trainSchedule;      

// Functions and Processes ===========================================================================================================
$(document).ready(function() {
    trainsRef.on("child_added", function(snapshot) {
        var lastTrain = snapshot.val();
        var trainTime = lastTrain.trainTime;
        var frequency = lastTrain.frequency;
        trainSchedule = snapshot.val().trianSchedule;

        var nextTrain = getNextTrainTime(trainTime, frequency);
        $("#wellSection").append("<h5 class='col-lg-2'>" + snapshot.val().trainName + "</h5><h5 class='col-lg-3'>" + snapshot.val().destination + "</h5><h5 class='col-lg-3'>" + snapshot.val().trainTime + " Hours</h5><h5 class='col-lg-2'>"+ snapshot.val().frequency + " Minutes</h5><h5 class='col-lg-2'>" + nextTrain.format("hh:mm") + "</h5>");
    });

    // //Moment.js Variables ================================================================================================    
    function getNextTrainTime(trainTime, frequency) {
        var firstTimeConverted = moment(trainTime, "hh:mm");    // First train time converted to miltary time
        var currentTime = moment();    // Current Time
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");    // Difference between the times
        var tRemainder = diffTime % frequency;    // Time apart (remainder)
        var tMinutesTillTrain = frequency - tRemainder;     // Minute Until Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");    // Next Train
        console.log("First Time: " + firstTimeConverted);
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        console.log("DIFFERENCE IN TIME: " + diffTime);
        console.log("REMAINDER: " + tRemainder);
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        return nextTrain;
    };

    $(document).on("click", "#searchBtn", function(event) {
        event.preventDefault();
        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        var trainTime = $("#trainTime").val();
        var frequency = $("#frequency").val();

        writeUserData(trainName, destination, trainTime, frequency);

        function writeUserData(trainName, destination, trainTime, frequency) {
            trainsRef.push({
                trainName: trainName,
                destination: destination,
                trainTime: trainTime,
                frequency: frequency,
            });
        }
    });
});
