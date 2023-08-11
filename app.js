/*
SETUP
*/

// Express

var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 50906;                 // Set a port number at the top so it's easy to change in the future

// app.js
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', exphbs({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector')

// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));         // this is needed to allow for the form to use the ccs style sheet/javscript

/*
    ROUTES
*/
app.get('/', function(req, res)
    {
    let query1 = "SELECT * FROM bsg_people;";
    db.pool.query(query1, function(error, rows, fields){
        res.render('index', {data: rows});
    })
                
    });

app.get('/members', (req, res) =>
    {
    let query1;
    if (req.query.name === undefined)
    {
        query1 = "SELECT * FROM Members;";

    }
    else
    {
        query1 =`SELECT * FROM Members WHERE name LIKE "${req.query.name}%"`
    }
    let query2 = "SELECT * FROM Members"
    db.pool.query(query1, function(error, rows, fields){
        let members = rows;
        db.pool.query(query2, (error,rows, fields) => {
            let fitmembers = rows;
            return res.render('members', {data: members, fitmembers: fitmembers});
        })
        })
            
        });
 app.get('/activities', function(req, res)
    {
        let query1 = "SELECT * FROM bsg_people;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('activities', {data: rows});
        })
    });
app.get('/reservations', function(req, res)
    {
        let query1 = "SELECT * FROM bsg_people;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('reservations', {data: rows});
        })
    });
app.get('/equipment', function(req, res)
    {
        let query1 = "SELECT * FROM Equipments;";
        db.pool.query(query1, function(error, rows, fields){
            return res.render('equipment', {data: rows});
        })
    });


// Members
app.post('/add-member', function(req, res) {
    let body = req.body;
    console.log('Body:', req);
    const name = body.name;
    const email = body.email;
    let phone_number;
    if (body.phone_number != '') {
        phone_number = body.phone_number
    } else {
        phone_number = 'NULL'
    }
    const join_date = body.join_date;

    let query = `INSERT INTO Members (name, email, phone, join_date) VALUES('${name}', '${email}', '${phone_number}', '${join_date}')`;    
    db.pool.query(query, function(error, row, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/members');
        }
    });
});

app.post('/edit-member', function(req, res) {
    let body = req.body;

    const id = parseInt(body.member_id);
    const name = body.name;
    const email = body.email;
    let phone_number;
    if (body.phone_number != '') {
        phone_number = body.phone
    } else {
        phone_number = 'NULL'
    }
    const join_date = body.join_date;
    
    query = `UPDATE Members SET name = ?, email = ?, phone = ?, join_date = ? WHERE memberId = ?`;
    db.pool.query(query, [name, email, phone_number, join_date, id], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.redirect('members');
        }
    });
});

app.delete('/delete-member', function(req, res) {
    
    const id = parseInt(req.body.member_id);
    console.log(req.body);
    query = 'DELETE FROM Members WHERE memberID = ?';
    db.pool.query(query, [id], function(error, rows, fields) {
        if (error) {
            // console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

//Equipment
app.post('/add-equipment', function(req, res) {
    let body = req.body;
    console.log('Body:', req);
    const name = body.name;
    const itemCount = body.item_count

    let query = `INSERT INTO Equipments (name, item_count) VALUES('${name}', '${itemCount}')`;    
    db.pool.query(query, function(error, row, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/equipment');
        }
    });
});

app.delete('/delete-equipment', function(req, res) {
    
    const id = parseInt(req.body.equipment_id);
    console.log(req.body);
    query = 'DELETE FROM Equipments WHERE equipmentID = ?';
    db.pool.query(query, [id], function(error, rows, fields) {
        if (error) {
            // console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

