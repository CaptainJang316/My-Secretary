var mysql = require('mysql');
const db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : 'nibc663927',
    database : 'todolist'
});

module.exports = db;