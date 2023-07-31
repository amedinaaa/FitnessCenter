import express from 'express';


const express = require('express');   
const app     = express(); 
app.use(express.static('public'));       
PORT        = 50408;  
// Database
var db = require('./public/db-connector')

// Members
// Search for members
app.use(express.json());

app.get('/members.html/:_member_name', async (req, res) => { 
    query1= `SELECT * FROM Members WHERE name LIKE "%${req.params._member_name}%";`;
    db.pool.query(query1, function(err, results, fields){
        // Send the results to the browser
        let base = "<h1>MySQL Results:</h1>"
        res.send(base + JSON.stringify(results));
    });
});


app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

