const express = require('express');
const router = express.Router();

const { registerUserController } = require('../controllers/authController.js');
const { getContracts } = require('../controllers/contractsController.js');

// Routes pour authController
router.post('/api/register', registerUserController);

//Route pour contractsController 
router.get('/api/contracts', getContracts);


module.exports = router;
