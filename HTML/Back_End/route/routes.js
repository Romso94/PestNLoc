const express = require('express');
const router = express.Router();

const { registerUserController } = require('../controllers/authController.js');
const { getContracts, getContractById, deleteContract, createContract,updateContract } = require('../controllers/contractsController.js');
const { getCars,getCarById,createCar,updateCar,deleteCar} = require('../controllers/carController.js');
const { getAllAgencies, getAgencyById, deleteAgency } = require('../controllers/agenciesController.js');




// Routes pour authController
router.post('/pestnloc/register', registerUserController);

//Route pour contractsController 
router.post('/pestnloc/contracts',createContract);                  
router.get('/pestnloc/contracts', getContracts);                    
router.get('/pestnloc/contracts/:idContract', getContractById );   
router.put('/pestnloc/contracts/:idContract',updateContract);
router.delete('/pestnloc/contracts/:idContract',deleteContract);



// Route pour carController
router.get('/pestnloc/cars',getCars);
router.get('/pestnloc/cars/:licensePlate',getCarById);
router.post('/pestnloc/cars',createCar);
router.put('/pestnloc/cars/:licensePlate',updateCar);
router.delete('/pestnloc/cars/:licensePlate',deleteCar);

// Route pour agenciesController
router.get('/pestnloc/agencies',getAllAgencies);
router.get('/pestnloc/agencies/:idAgency',getAgencyById);
router.delete('/pestnloc/agencies/:idAgency', deleteAgency);



module.exports = router;
