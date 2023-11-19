const express = require('express');
const router = express.Router();

const { registerUserController } = require('../controllers/authController.js');
const { getContracts } = require('../controllers/contractsController.js');

// Routes pour authController
router.post('/pestnloc/register', registerUserController);

//Route pour contractsController 
router.get('/pestnloc/contracts', getContracts);


module.exports = router;
