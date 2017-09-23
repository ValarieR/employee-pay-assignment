$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDIpq_qDmAW5koddC_e2CCB8JBULPgfc9k",
        authDomain: "gtcbc7-2-1.firebaseapp.com",
        databaseURL: "https://gtcbc7-2-1.firebaseio.com",
        projectId: "gtcbc7-2-1",
        storageBucket: "gtcbc7-2-1.appspot.com",
        messagingSenderId: "473723028660"
    };
    firebase.initializeApp(config);

    // Assign the reference to the database to a variable named 'database'
    var database = firebase.database();

    // Initialize Global Variables
    var obj = {};


    // on submit button do this
    $("#add-new").on("click", function () {

        console.log("add-new");
        // Don't refresh the page!
        event.preventDefault();

        // Grab data input
        var newobj = {};
        newobj.name = $("#name-input").val().trim();
        newobj.role = $("#role-input").val().trim();
        newobj.startDate = $("#start-date-input").val().trim();
        newobj.monthlyRate = $("#monthly-rate-input").val().trim();

        console.log(newobj);
        // Send data to firebase
        database.ref('/Activity17').push({
            data: newobj
        });

    });
    // Update screen with data
    database.ref().orderByChild("startDate").limitToLast(1).on("child_added", function (snapshot) {

        var sv = snapshot.val();

        console.log(sv);
    })


})
;