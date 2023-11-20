const express = require('express');
const router = express.Router();

const { registerUserController } = require('../controllers/authController.js');
const { getContracts, getContractById, deleteContract } = require('../controllers/contractsController.js');
const { getRentals,getRentalById } = require('../controllers/rentController.js');


// Routes pour authController
router.post('/pestnloc/register', registerUserController);

//Route pour contractsController 
router.get('/pestnloc/contracts', getContracts);
router.get('/pestnloc/contracts/:id', getContractById );
router.delete('/pestnloc/contracts/:id',deleteContract);


// Route pour rentController
router.get('/pestnloc/cars',getRentals);
router.get('/pestnloc/cars/:id',getRentalById);


module.exports = router;
