const mysql = require('mysql2');

const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'password@123',
    database : 'ecomerce',
   
});


module.exports=pool.promise()