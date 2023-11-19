const express = require('express');
const router = express.Router();

const { registerUserController } = require('../controllers/authController.js');
const { getContracts, getContractById, deleteContract } = require('../controllers/contractsController.js');


// Routes pour authController
router.post('/pestnloc/register', registerUserController);

//Route pour contractsController 
router.get('/pestnloc/contracts', getContracts);
router.get('/pestnloc/contracts/:id', getContractById );
router.delete('/pestnloc/contracts/:id',deleteContract);


module.exports = router;
