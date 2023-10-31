const mysql = require('mysql2/promise');
const conn = mysql.createConnection({
    host:'localhost', user: 'root', database: 'carsdb', password: '', debug: false
});
conn.then(function(conn) {
    conn.execute('SELECT * FROM users').then(function(result){ const [rows, fields]=result; console.log(rows); });
    conn.execute('SELECT * FROM cars').then(function(result){ const [rows, fields]=result; console.log(rows); process.exit(); });
});
return;
*/

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.listen(process.env.WEB_PORT, '0.0.0.0',
    function() { console.log("Listening on "+process.env.WEB_PORT); }
);

app.get('/', (request, response) => { // 'GET' as a HTTP VERB, not as a 'getter'!
    let clientIp = request.ip;
    response.send(`Hello, dear ${clientIp}. I am a nodejs website...`);
    response.end(); // optional
});
