// importo mysql2
const mysql = require('mysql2');

// creo la connessione al db 
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SteopaRoot',
    database: 'db_blog',
});

//instauro una connessione al database 
connection.connect((err) => {
    if(err){
        console.log(err);
    } else {
        console.log('Connected to mysql')
    }
}); 

// esporto la connessione creata 
module.exports = connection;