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

app.get('/', function (req, res){
    res.sendStatus(500)
})

app.get('/alien', function (req, res){
    res.send('Welcome Back Alien')
})
app.listen(9000, function (req, res){
    console.log('running')
});