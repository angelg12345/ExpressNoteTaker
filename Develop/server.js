console.log('hello from index.js')
//packages
const express = require("express");
const path = require("path");
const fs = require("fs");
const {v4: uuidv4 } = require('uuid')


const app = express ();
// Setting a port for the server to run on
const PORT = process.env.PORT || 3001;
// file path for the database json file
const dbFilePath = path.join(__dirname, "db", "db.json");

// serving static files from the 'public' directory
app.use(express.static('public'))

// allowing json to server
app.use(express.json())





//  this is getting notes from the JSON file
app.get('/api/notes', function (req, res){
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data)

        res.json(dbData)
    });
});

// endpoint for adding a new note
app.post('/api/notes', (req, res) =>{
    const newNote = req.body

    newNote.id = uuidv4()

    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        }
   

    const db = JSON.parse(data);
    db.push(newNote);

    fs.writeFile(dbFilePath, JSON.stringify(db), (err) => {
        if (err) {
            console.error(err);
        }
        res.json(db)
    })

   
})
})

// endpoint for deleting a note by id
app.delete('/api/notes/:id', (req, res) => {
    const noteIDtoDelete = req.params.id;

    fs.readFile(dbFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        }
        const db = JSON.parse(data);
        const newDb = db.filter((note) => note.id !== noteIDtoDelete);

        fs.writeFile(dbFilePath, JSON.stringify(newDb), (err) => {
            if (err) {
                console.error(err);
            }
            res.json(newDb);
        });
    });
});



// endpoint for the main html page

app.get('/', function (req, res){
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
// endpoint for the notes html page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})
// default endpoint
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// this is starting the server
app.listen(PORT, function (){
    console.log(`Server is running on port ${PORT}`)
 
});