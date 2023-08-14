// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : //removed
    user            : //removed
    password        : //removed
    database        : // removed
})

// Export it for use in our application
module.exports.pool = pool;