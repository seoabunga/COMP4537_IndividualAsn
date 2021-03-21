const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: "localhost",
    user: "brianseo_admin",
    // user: "root",
    password: "Password4537",
    database: "brianseo_webdevdb"
})

// Connect to MySQL to run SQL Queries
db.connect(function(err) {
    if(err) {
        throw err;
    } else {
        console.log("Connected to the database..")
    }
})

// https://stackoverflow.com/questions/16111386/error-cannot-find-module-html/24140944
// Loads the index in directory
app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', "*");
    next();
})

// SERVER
// [GET] /quotes - gets all quotes stored
app.get('/quotes', function(req, res) {
    db.query(
            `SELECT * FROM quote`
            , function(err, result) {
        if (err){
            throw err;
        }
        res.json(result);
    });
})

// [GET] /quotes/recent - gets quotes ordered by most recent
app.get('/quotes/recent', function(req, res) {
    db.query(
            `SELECT * from Quote ORDER BY QuoteID DESC`
            , function(err, result) {
        if (err){
            throw err;
        }
        res.json(result);
    });
})


// [POST] /quotes - adds a quote
app.post('/quotes', function(req, res) {
    let quote = req.body.QuoteText;
    let source = req.body.Source;

    db.query(
        `INSERT INTO Quote (Body, Source) VALUES("${quote}", "${source}")`
        , function(err, result) {
        if (err){
            throw err;
        } else {
            res.json(result);
        }
    });
})

// [PUT] /quotes - updates a quote
app.put('/quotes', function(req, res) {
    let quote = req.body.QuoteText;
	let id = req.body.QuoteID;
	let source = req.body.Source;

    db.query(
        `UPDATE Quote SET Body = "${quote}", Source = "${source}" WHERE QuoteID = ${id}`
        , function(err, result) {
        if (err){
            throw err;
        }
    });

})

// [DELETE] /quotes - deletes a quote
app.delete('/quotes', function(req, res) {
	let id = parseInt(req.body.QuoteID);

    db.query(
        `DELETE FROM Quote WHERE QuoteID = ${id}`
        , function(err, result) {
        if (err){
            throw err;
        }
    });
})

// Start the server
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})