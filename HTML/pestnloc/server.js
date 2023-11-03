const mysql = require('mysql2/promise');

const conn = mysql.createConnection({
    host:'localhost', user: 'root', database: 'PesNloc', password: 'Florian1!', debug: false
});
conn.then(function(conn) {
    conn.execute('SELECT * FROM Contract').then(function(result){ const [rows, fields]=result; console.log(rows); });

});


const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();



var path = require('path');
var serveStatic = require('serve-static');

app.use(serveStatic(__dirname + "/dist"));

app.listen(process.env.WEB_PORT, '0.0.0.0',
    function() { console.log("Listening on "+process.env.WEB_PORT); }
);

app.get('/', (request, response) => { // 'GET' as a HTTP VERB, not as a 'getter'!
    let clientIp = request.ip;
    response.send(`Hello, dear ${clientIp}. I am a nodejs website...`);
    response.end(); // optional
});


