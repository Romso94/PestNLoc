const express = require('express');
const router = express.Router();

const { registerUserController } = require('../controllers/authController.js');
const { getContracts, getContractById, deleteContract } = require('../controllers/contractsController.js');
const { getCars,getCarById,createCar,updateCar,deleteCar} = require('../controllers/carController.js');



// Routes pour authController
router.post('/pestnloc/register', registerUserController);

//Route pour contractsController 
router.get('/pestnloc/contracts', getContracts);
router.get('/pestnloc/contracts/:id', getContractById );
router.delete('/pestnloc/contracts/:id',deleteContract);


// Route pour carController
router.get('/pestnloc/cars',getCars);
router.get('/pestnloc/cars/:licensePlate',getCarById);
router.post('/pestnloc/cars/register',createCar);
router.put('/pestnloc/cars/update/:licensePlate',updateCar);
router.delete('/pestnloc/cars/:licensePlate',deleteCar);


module.exports = router;
