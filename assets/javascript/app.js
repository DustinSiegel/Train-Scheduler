    // Global Variables ====================================================================================================

// var authKey = "Placeholder";

// Search Parameters
var trainName   = "";
var destination = "";
var trainTime   = 0;
var frequency   = 0;
var nextTrain   = 0;

// URL Base
// var queryURLBase = "Placdholder/" + authKey;

//Moment.js Variables ================================================================================================    

    var tFrequency = 3;
    // Time is 3:30 AM
    var firstTime = "03:30";
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



// FireBase Link =======================================================================================================








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


    $("#wellSection").append("<h5 class='col-lg-2'>" + trainName + "</h5><h5 class='col-lg-3'>" + destination + "</h5><h5 class='col-lg-3'>" + trainTime + "</h5><h5 class='col-lg-2'>"+ frequency + "</h5><h5 class='col-lg-2'>" + nextTrain + " Minutes</h5>");
    // $("#wellSection").append("<h5>" + destination + "</h5>");
    // $("#WellSection").append("<h5>" + trainTime + "</h5>");
    // $("#WellSection").append("<h5>" + frequency + "</h5>");

    return false;
});


    // // Get the Start Year and End Year
    // startYear = $('#starYear').val();
    // endYear = $('#endYear').val();