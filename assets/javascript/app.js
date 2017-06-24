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

// var authKey = "Placeholder";

// Search Parameters
var trainName   = "";
var destination = "";
var trainTime   = "";
var frequency   = "";
var nextTrain   = "";
var firebase;

// URL Base
// var queryURLBase = "Placdholder/" + authKey;


// Functions and Processes ===========================================================================================================

$(document).on("click", "#searchBtn", function() {

    trainName = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#trainTime").val();
    frequency = $("#frequency").val();
    
     var trainSchedule = {trainName, destination, trainTime, frequency}
    database.ref().set(trainSchedule);

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

//Moment.js Variables ================================================================================================    

    var firstTimeConverted = moment(trainTime, "hh:mm");    // First train time converted to miltary time
    var currentTime = moment();    // Current Time
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");    // Difference between the times
    var tRemainder = diffTime % frequency;    // Time apart (remainder)
    var tMinutesTillTrain = frequency - tRemainder;     // Minute Until Train
    nextTrain = moment().add(tMinutesTillTrain, "minutes");    // Next Train


$("#wellSection").append("<h5 class='col-lg-2'>" + trainName + "</h5><h5 class='col-lg-3'>" + destination + "</h5><h5 class='col-lg-3'>" + trainTime + " Hours</h5><h5 class='col-lg-2'>"+ frequency + " Minutes</h5><h5 class='col-lg-2'>" + moment(nextTrain).format("hh:mm") + "</h5>");
    
    console.log("First Time: " + firstTimeConverted);
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    console.log("DIFFERENCE IN TIME: " + diffTime);
    console.log("REMAINDER: " + tRemainder);
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        
    return false;
});
