const express = require('express');   
const app     = express(); 
app.use(express.static('public'));       
PORT        = 50408;  

app.get('/', function(req, res)

    {res.send("hi")});

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});