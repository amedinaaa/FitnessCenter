/*
SETUP
*/

// Express

const express = require('express');   
const app     = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public')) 
PORT        = 50905;  
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
    {
    let query1 = "SELECT * FROM Members;";
    db.pool.query(query1, function(error, rows, fields){
            res.render('members.hbs', {data: rows});
        })
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
app.post('/addMember', function(req, res) {
    let body = req.body;

    let name = body.name;
    let email = body.email;
    let phone;
    if (body.phone != '') {
        phone = body.phone
    } else {
        phone = 'NULL'
    }
    let join_date = body.join_date;

    query = `INSERT INTO Members (name, email, phone, join_date) VALUES('${name}', '${email}', '${phone}', '${join_date}')`;    
    db.pool.query(query, function(error, row, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/members.hbs');
        }
    });
});

app.put('/edit-member/', function(req, res) {
    let body = req.body;

    const id = parseInt(body.id);
    const name = body.name;
    const email = body.email;
    let phone_number;
    if (body.phone_number != '') {
        phone_number = body.phone_number
    } else {
        phone_number = 'NULL'
    }
    const join_date = body.joinDate;
    
    query = `UPDATE Members SET name = ?, email = ?, phone = ?, join_date = ? WHERE memberId = ?`;
    db.pool.query(query, [name, email, phone_number, join_date, id], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            res.send(rows);
        }
    });
});

app.delete('/delete-member', function(req, res) {
    let body = req.body;

    const id = body.id;
    
    query = 'DELETE FROM Members WHERE id = ?';
    db.pool.query(query, [id], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});



app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

