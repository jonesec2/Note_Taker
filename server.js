//=================================================
const express = require("express");
const path = require("path");
const fs = require("fs")
const db = require("./db/db")

// console.log(db)

//=================================================
const app = express();
const PORT = 3000;

//=================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//=================================================
const notes = []


// HTML Routes
//=================================================
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});



// API routes
//=================================================
app.get("/api/notes", function (req, res) {
    return res.json(db);
});

app.post("/api/notes", function (req, res) {
    let newNote = req.body;

    // Using a RegEx Pattern to remove spaces from newNote
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();

    console.log(newNote);

    fs.appendFile('db.json', newNote, function(err) {
        if (err) throw err;
    })
    // characters.push(newNote);

    res.json(newNote);
});

app.delete("/api/notes/:id", function (req, res) {
    
})


// Server is listening
//=================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
