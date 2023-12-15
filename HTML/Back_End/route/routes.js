const express = require('express');
const router = express.Router();
const {verifyToken,adminOnly} = require('../middleware/auth.js');

const { registerUserController, loginUser, registerAdminController, loginAdmin } = require('../controllers/authController.js');
const { getContracts, getContractById, deleteContract, createContract, updateContract, getContractByLicensePlate, getContractsByAgency, getContractByClient } = require('../controllers/contractsController.js');
const { getCars, getCarById, createCar, updateCar, deleteCar, getAllCarByAgencyId } = require('../controllers/carController.js');
const { getAllAgencies, getAgencyById, deleteAgency, updateAgency} = require('../controllers/agenciesController.js');
const { getClientById, getAllClient, deleteClient, updateClient } = require('../controllers/clientController.js');



// Routes pour authController
router.post('/pestnloc/register', registerUserController);
router.post('/pestnloc/login', loginUser);
router.post('/pestnloc/admin/register', registerAdminController);
router.post('/pestnloc/admin/login', loginAdmin);


// Routes pour clientController
router.get('/pestnloc/clients/:idClient', verifyToken, getClientById);
router.get('/pestnloc/clients', verifyToken, adminOnly, getAllClient);
router.delete('/pestnloc/clients/:idClient', verifyToken, adminOnly, deleteClient);
router.put('/pestnloc/clients/:idClient', verifyToken, adminOnly, updateClient);

//Route pour contractsController
router.post('/pestnloc/contracts', verifyToken, createContract);
router.get('/pestnloc/contracts', verifyToken, adminOnly, getContracts);
router.get('/pestnloc/contracts/:idContract', verifyToken, adminOnly, getContractById);
router.get('/pestnloc/contracts/clients/:idClient',verifyToken, getContractByClient);
router.get('/pestnloc/contracts/cars/:licensePlate', verifyToken, adminOnly, getContractByLicensePlate);
router.get('/pestnloc/contracts/agencies/:idAgency', verifyToken, adminOnly, getContractsByAgency);
router.put('/pestnloc/contracts/:idContract', verifyToken, adminOnly, updateContract);
router.delete('/pestnloc/contracts/:idContract', verifyToken,  deleteContract);

// Route pour carController
router.get('/pestnloc/cars', getCars);
router.get('/pestnloc/cars/:licensePlate', verifyToken, adminOnly, getCarById);
router.post('/pestnloc/cars', verifyToken, adminOnly, createCar);
router.put('/pestnloc/cars/:licensePlate', verifyToken, adminOnly, updateCar);
router.delete('/pestnloc/cars/:licensePlate', verifyToken, adminOnly, deleteCar);
router.get('/pestnloc/cars/agencies/:idAgency', getAllCarByAgencyId);

// Route pour agenciesController
router.get('/pestnloc/agencies',  getAllAgencies);
router.get('/pestnloc/agencies/:idAgency',  getAgencyById);
router.delete('/pestnloc/agencies/:idAgency', verifyToken, adminOnly, deleteAgency);
router.put('/pestnloc/agencies/:idAgency', verifyToken, adminOnly, updateAgency);



module.exports = router;
