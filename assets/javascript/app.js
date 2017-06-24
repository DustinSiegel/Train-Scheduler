// FireBase Link =======================================================================================================

  // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyDms5AHA1Q__tuwAbyrwJVo3krAEoqMI6E",
  //   authDomain: "train-scheduler-7f64d.firebaseapp.com",
  //   databaseURL: "https://train-scheduler-7f64d.firebaseio.com",
  //   projectId: "train-scheduler-7f64d",
  //   storageBucket: "train-scheduler-7f64d.appspot.com",
  //   messagingSenderId: "130680246488"
  // };
  // firebase.initializeApp(config);


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
    // Add in the Search Term
    // var newURL = queryURLBase + "&q=" + trainName;
    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);






//Moment.js Variables ================================================================================================    

    var firstTimeConverted = moment(trainTime, "hh:mm");
    console.log("First Time: " + firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

$("#wellSection").append("<h5 class='col-lg-2'>" + trainName + "</h5><h5 class='col-lg-3'>" + destination + "</h5><h5 class='col-lg-3'>" + trainTime + " Hours</h5><h5 class='col-lg-2'>"+ frequency + " Minutes</h5><h5 class='col-lg-2'>" + moment(nextTrain).format("hh:mm") + "</h5>");

        
    return false;
});
