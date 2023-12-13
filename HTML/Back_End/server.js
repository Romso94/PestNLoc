// server.js

const express = require('express');
const cors = require('cors');
const routes = require('./route/routes.js');
const {verifyToken,adminOnly} = require('./middleware/auth.js'); 





const app = express();
const port = 9000;

app.use(cors()
);
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Starting Server on ${port}`);
});
