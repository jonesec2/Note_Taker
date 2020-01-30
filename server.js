//=================================================
const express = require("express");
const path = require("path");
const fs = require("fs")
const db = require("./db/db.json")

// console.log(db)

//=================================================
const app = express();
const PORT = process.env.PORT || 3000;

//=================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));


//=================================================

// HTML Routes
//=================================================
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});



// API routes
//=================================================
app.get("/api/notes", function (req, res) {
    // console.log(res.json(db))
    return res.json(db);
});

app.post("/api/notes", function (req, res) {
    let newNote = req.body;

    db.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(db), function(err) {
        if (err) throw err;
        console.log("Note added!")
    })

});

app.delete("/api/notes/:id", function (req, res) {
    
})


// Server is listening
//=================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
