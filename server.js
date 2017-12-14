// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var reservations = [];
var waiting = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/all", function (req, res) {
    res.sendFile(path.join(__dirname, "all.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/reservations", function (req, res) {
    return res.json(reservations);
});

app.get("/api/waiting", function (req, res) {
    return res.json(waiting);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newReservation = req.body;
    console.log(newReservation);
    if (reservations.length < 5) {
        reservations.push(newReservation);
    } else {
        waiting.push(newReservation);
    }

    res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
