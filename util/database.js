const mysql = require('mysql2');

const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'password@123',
    database : 'ecomerce',
    
   
});


exports.pool=pool.promise()
exports.db=exports.db = (qry) =>{
    return new Promise((resolve, reject)=>{
        pool.query(qry,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};
 