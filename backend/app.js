const express = require('express');
const mysql = require('mysql');
const path = require('path');

const root = '/COMP4537/asn1/quotes';

const app = express();

const port = process.env.PORT || 3000;

const db = mysql.createConnection({
    host: "localhost",
    user: "brianseo_4537",
    password: "Password4537",
    database: "brianseo_webdevdb"
})

db.connect(function(err) {
    if(err) {
        throw err;
    } else {
        console.log("Connected to the database..")
    }
})

app.use(express.json());
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', "*");
    next();
})

// SERVER
app.use(express.static(__dirname + 'public'));

// [GET] /quotes - gets all quotes stored
app.get(root + '/quotes', function(req, res) {
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
app.get(root + '/quotes/recent', function(req, res) {
    db.query(
            `SELECT * from quote ORDER BY QuoteID DESC LIMIT 1`
            , function(err, result) {
        if (err){
            throw err;
        }
        res.json(result);
    });
})


// [POST] /quotes - adds a quote
app.post(root + '/quotes', function(req, res) {
    let quote = req.body.QuoteText;
    let source = req.body.Source;

    db.query(
        `INSERT INTO quote (Body, Source) VALUES("${quote}", "${source}")`
        , function(err, result) {
        if (err){
            throw err;
        } else {
            res.json(result);
        }
    });
})

// [PUT] /quotes - updates a quote
app.put(root + '/quotes', function(req, res) {
    let quote = req.body.QuoteText;
	let id = req.body.QuoteID;
	let source = req.body.Source;

    db.query(
        `UPDATE quote SET Body = "${quote}", Source = "${source}" WHERE QuoteID = ${id}`
        , function(err, result) {
        if (err){
            throw err;
        }
    });

})

// [DELETE] /quotes - deletes a quote
app.delete(root + '/quotes', function(req, res) {
	let id = parseInt(req.body.QuoteID);

    db.query(
        `DELETE FROM quote WHERE QuoteID = ${id}`
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