//Gere la connexion avec la base de donnée.

import { createConnection } from 'mysql2';

require('dotenv').config();


const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,
};


const connection = createConnection(dbConfig);


connection.connect((err) => {
  if (err) {
    console.error('DataBase connexion error :', err);
    throw err;
  }
  console.log('Connected to  MySQL');
});


process.on('SIGINT', () => {
  connection.end();
  process.exit();
});


export default connection;
