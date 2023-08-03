

app.get('/members.html/:_member_name', function(req, res){ 
   var query1= `SELECT * FROM Members WHERE name LIKE "%${req.params._member_name}%";`;
    db.pool.query(query1, function(err, results, fields){
        // Send the results to the browser
       
        res.render('members.hhtml/:_member_name', JSON.stringify(results));
    });
});

