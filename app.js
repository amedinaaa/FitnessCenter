/*
SETUP
*/

// Express

const express = require('express');   
const app     = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public')) 
PORT        = 50900;  
// Database
const db = require('./database/db-connector')
// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
const { query } = require('express');
app.engine('.hbs', exphbs({
    extname: ".hbs"
}));
app.set('view engine', '.hbs');

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

app.get('/members.hbs', function(req, res)
    {res.render('members.hbs');
        
    });
 app.get('/activities.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM bsg_people;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('activites', {data: rows});
        })
    });
app.get('/reservations.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM bsg_people;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('reservations', {data: rows});
        })
    });
app.get('/equipment.hbs', function(req, res)
    {
        let query1 = "SELECT * FROM bsg_people;";
        db.pool.query(query1, function(error, rows, fields){
            res.render('equipment', {data: rows});
        })
    });


 

// Members
// Search for members



app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

