// importo mysql2
const mysql = require('mysql2');

// creo la connessione al db 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_blog',
})