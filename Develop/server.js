//packages
const express = require("express");
const path = require("path");
const fs = require("fs");


const PORT = process.env.PORT || 3000
const db = require('./db/db.json')
const util = require("util")


const app = express ();

app.use(express.static('public'))
app.use(express.json())
//  this is getting notes from the JSON file
app.get('/api/notes', function (req, res){
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data)

        res.json(dbData)
    })
})

app.post('/api/notes', (req, res) =>{
    const newNote = req.body

    db.push(newNote)

    fs.writeFileSync('./db/db.json', JSON.stringify(db))

    res.json(db)
    
})

app.get('/alien', function (req, res){
    res.send('Welcome Back Alien')
})

// this is starting the server
app.listen(PORT, function (){
    console.log(`Server is running on port ${PORT}`)
});