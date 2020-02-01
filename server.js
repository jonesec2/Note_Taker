//=================================================
const express = require("express");
const path = require("path");
const fs = require("fs")
const db = require("./db/db.json")
const Sugar = require("sugar")

Sugar.extend();

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

    return res.json(db);
});

app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    newNote['id'] = db.length + 1
    console.log(newNote)
    db.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(db), function (err) {
        if (err) throw err;
        console.log("Note added!")
    })

});


app.delete("/api/notes/:id", function (req, res) {
    
    const chosenNote = req.params.id;
    console.log(db[1].id)
    console.log(chosenNote)
    // let newArray = db.remove(function(el) {return el.id === chosenNote})
    // console.log(JSON.stringify(newArray))

    // db.push(newArray);

    fs.writeFile('./db/db.json', JSON.stringify(db), function (err) {
        if (err) throw err;
        "Note Deleted"
    })
})


// Server is listening
//=================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
