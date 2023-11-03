const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'PesNloc',
    password: 'Florian1!',
    debug: false
});
conn.then(function (conn) {
    conn.execute('SELECT * FROM Contract').then(function (result) {
        const [rows, fields] = result;
        console.log(rows);
    });
});

dotenv.config();