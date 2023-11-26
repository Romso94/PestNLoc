const express = require('express');
const router = express.Router();

const { registerUserController } = require('../controllers/authController.js');
const { getContracts, getContractById, deleteContract, createContract, updateContract, getContractByLicensePlate, getContractsByAgency } = require('../controllers/contractsController.js');
const { getCars, getCarById, createCar, updateCar, deleteCar, getAllCarByAgencyId } = require('../controllers/carController.js');
const { getAllAgencies, getAgencyById, deleteAgency, createAgency, updateAgency } = require('../controllers/agenciesController.js');
const { getClientById, getAllClient, deleteClient } = require('../controllers/clientController.js');



// Routes pour authController
router.post('/pestnloc/register', registerUserController);

// Routes pour clientController 
router.get('/pestnloc/clients/:idClient', getClientById);
router.get('/pestnloc/clients', getAllClient);
router.delete('/pestnloc/clients/:idClient', deleteClient);

//Route pour contractsController 
router.post('/pestnloc/contracts', createContract);
router.get('/pestnloc/contracts', getContracts);
router.get('/pestnloc/contracts/:idContract', getContractById);
router.get('/pestnloc/contracts/cars/:licensePlate', getContractByLicensePlate);
router.get('/pestnloc/contracts/agencies/:idAgency', getContractsByAgency);
router.put('/pestnloc/contracts/:idContract', updateContract);
router.delete('/pestnloc/contracts/:idContract', deleteContract);

// Route pour carController
router.get('/pestnloc/cars', getCars);
router.get('/pestnloc/cars/:licensePlate', getCarById);
router.post('/pestnloc/cars', createCar);
router.put('/pestnloc/cars/:licensePlate', updateCar);
router.delete('/pestnloc/cars/:licensePlate', deleteCar);
router.get('/pestnloc/cars/agencies/:idAgency', getAllCarByAgencyId);

// Route pour agenciesController
router.get('/pestnloc/agencies', getAllAgencies);
router.get('/pestnloc/agencies/:idAgency', getAgencyById);
router.delete('/pestnloc/agencies/:idAgency', deleteAgency);
router.post('/pestnloc/agencies', createAgency);
router.put('/pestnloc/agencies/:idAgency', updateAgency);



module.exports = router;
