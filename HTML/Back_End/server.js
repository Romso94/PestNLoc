// server.js

const express = require('express');
const cors = require('cors');
const routes = require('./route/routes.js');
const {verifyToken,adminOnly} = require('./middleware/auth.js'); 


const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Accès non autorisé par CORS'));
    }
  },
};

const app = express();
const port = 9000;

app.use(cors(corsOptions));
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Starting Server on ${port}`);
});
