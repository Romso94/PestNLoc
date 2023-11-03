// const mysql = require('mysql2/promise');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
//
// const conn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'PesNloc',
//     password: 'Florian1!',
//     debug: false
// });
// conn.then(function (conn) {
//     conn.execute('SELECT * FROM Contract').then(function (result) {
//         const [rows, fields] = result;
//         console.log(rows);
//     });
// });

dotenv.config();

const app = express();

// Servez les fichiers statiques de l'application Vue.js depuis le répertoire "dist"
app.use(express.static(path.join(__dirname, 'dist')));


// Gérez toutes les autres routes en renvoyant l'index.html (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.WEB_PORT || 3000, () => {
    console.log("App launched on : \nhttp://localhost:" + (process.env.WEB_PORT || 3000));
});
