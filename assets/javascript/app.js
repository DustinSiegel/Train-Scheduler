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

// Global Variables ====================================================================================================

var trainName   = "";
var destination = "";
var trainTime   = "";
var frequency   = "";
var nextTrain   = "";
var firebase;

// Functions and Processes ===========================================================================================================

$(document).on("click", "#searchBtn", function() {

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#trainTime").val();
    frequency = $("#frequency").val();

    var trainSchedule = {"trainName": trainName, "destination": destination, "trainTime": trainTime, "frequency": frequency};
    database.ref("trains/").set(trainSchedule);
});

$(document).ready(function() {

    database.ref().on("child_added", function(snapshot) {
    console.log(snapshot.val());

        timeCalculator();

        $("#wellSection").append("<h5 class='col-lg-2'>" + snapshot.val().trainName + "</h5><h5 class='col-lg-3'>" + snapshot.val().destination + "</h5><h5 class='col-lg-3'>" + snapshot.val().trainTime + " Hours</h5><h5 class='col-lg-2'>"+ snapshot.val().frequency + " Minutes</h5><h5 class='col-lg-2'>" + moment(nextTrain).format("hh:mm") + "</h5>");
    // });

        database.ref().on("value", function (snapshot) {
        trainSchedule = snapshot.val().trianSchedule;
       }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        });
        
        return false;
    });
});

// //Moment.js Variables ================================================================================================    

function timeCalculator() {
    
    var firstTimeConverted = moment(trainTime, "hh:mm");    // First train time converted to miltary time
    var currentTime = moment();    // Current Time
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");    // Difference between the times
    var tRemainder = diffTime % frequency;    // Time apart (remainder)
    var tMinutesTillTrain = frequency - tRemainder;     // Minute Until Train
    nextTrain = moment().add(tMinutesTillTrain, "minutes");    // Next Train
    
    console.log("First Time: " + firstTimeConverted);
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    console.log("DIFFERENCE IN TIME: " + diffTime);
    console.log("REMAINDER: " + tRemainder);
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));       
};
