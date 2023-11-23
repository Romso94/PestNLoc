const express = require('express');
const router = express.Router();

const { registerUserController } = require('../controllers/authController.js');
const { getContracts, getContractById, deleteContract } = require('../controllers/contractsController.js');
const { getCars,getCarById,createCar } = require('../controllers/carController.js');


// Routes pour authController
router.post('/pestnloc/register', registerUserController);

//Route pour contractsController 
router.get('/pestnloc/contracts', getContracts);
router.get('/pestnloc/contracts/:id', getContractById );
router.delete('/pestnloc/contracts/:id',deleteContract);


// Route pour carController
router.get('/pestnloc/cars',getCars);
router.get('/pestnloc/cars/:id',getCarById);
router.post('/pestnloc/cars/register',createCar);


module.exports = router;
