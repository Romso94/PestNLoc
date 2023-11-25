// db.js
const { createConnection } = require('mysql2');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,
};

const connection = createConnection(dbConfig);

const execute = async (query, params) => {
  return new Promise((resolve, reject) => {
    connection.execute(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { connection, execute };

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('DataBase connexion error:', err);
    throw err;
  }
  console.log('Connected to MySQL');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});
