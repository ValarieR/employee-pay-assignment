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
    var sv;

    var name;
    var role;
    var startDate;
    var monthlyRate;

    var monthsWorked;
    var totalBilled;


    // on submit button do this
    $("#add-new").on("click", function () {
        // Don't refresh the page!
        event.preventDefault();

        // Grab data input
        name = $("#name-input").val().trim();
        role = $("#role-input").val().trim();
        startDate = $("#start-date-input").val().trim();
        monthlyRate = $("#monthly-rate-input").val().trim();

        // Check that data was grabbed correctly
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

        //Clear input fields
        clearInputs();
    });

    function clearInputs() {
        $('#name-input').val("");
        $('#role-input').val("");
        $('#start-date-input').val("");
        $('#monthly-rate-input').val("");
    }

    //Function to Calculate total billed
    function calcTotalBilled() {
        totalBilled = monthsWorked * parseInt(sv.monthlyRate);
    }

    //Function to Calculate months worked
    function calcMonthsWorked() {
        // monthsWorked =
    }

    // Load data from firebase add data to employee table
    database.ref('/Activity17').orderByChild("dateAdded").limitToLast(5).on("child_added", function (snapshot) {
        // Store data in variable sv
        sv = snapshot.val();

        // Check that data was loaded correctly
        console.log(sv);

        //Calculate months worked
        calcMonthsWorked();

        //Calculate total billed
        calcTotalBilled();

        //Create Rows for employee table
        var tTr = $("<tr>");

        var tTd = $("<td>");
        tTd.append(sv.name);
        tTr.append(tTd);

        tTd = $("<td>");
        tTd.append(sv.role);
        tTr.append(tTd);

        tTd = $("<td>");
        tTd.append(sv.startDate);
        tTr.append(tTd);

        tTd = $("<td>");
        tTd.append(monthsWorked);
        tTr.append(tTd);

        tTd = $("<td>");
        tTd.append(sv.monthlyRate);
        tTr.append(tTd);

        tTd = $("<td>");
        tTd.append(totalBilled);
        tTr.append(tTd);

        //Append New rows to employee tables body
        $("#employee-table-body").append(tTr);
    })
})
;