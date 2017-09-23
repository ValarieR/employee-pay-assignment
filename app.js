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

    var name ;
    var role ;
    var startDate ;
    var monthlyRate ;


    // on submit button do this
    $("#add-new").on("click", function () {

        console.log("add-new");
        // Don't refresh the page!
        event.preventDefault();

        // Grab data input
        //var newobj = {};
        name = $("#name-input").val().trim();
        role = $("#role-input").val().trim();
        startDate = $("#start-date-input").val().trim();
        monthlyRate = $("#monthly-rate-input").val().trim();

        console.log(name);
        console.log(role);
        console.log(startDate);
        console.log(monthlyRate);
        
        // Send data to firebase
        database.ref('/Activity17').push({
            name: name,
            role: role,
            startDate: startDate,
            monthlyRate: monthlyRate,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    });
    // Update screen with data
    database.ref('/Activity17').orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

        var sv = snapshot.val();

        console.log(sv);
    })


})
;