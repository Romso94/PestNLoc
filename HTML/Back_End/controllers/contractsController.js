
const Contract = require('../models/contractsModel.js');

async function getContracts(req, res) {

  try {
    const contracts = await Contract.getAllContracts();
    res.json(contracts);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

async function getContractById(req, res) {
  const { idContract } = req.params;
  try {
    const contracts = await Contract.getContractById(idContract);
    res.json(contracts);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createContract(req, res) {

  const {  Start_Date, Price, End_Date, Id_Client, License_Plate } = req.body;

  try {
    const dataContract = {  Start_Date, Price, End_Date, Id_Client, License_Plate };
    const contracts = await Contract.createContract(dataContract);
    res.json(contracts);

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateContract(req, res) {

  const { idContract } = req.params;
  const { Start_Date, Price, End_Date, Id_Client, License_Plate } = req.body;

  try {

    const dataContract = {  Start_Date, Price, End_Date, Id_Client, License_Plate };
    const contracts = await Contract.updateContract(idContract, dataContract);
    res.json(contracts);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });

  }
}

async function deleteContract(req, res) {

  const { idContract } = req.params;

  try {
    const contract = await Contract.deleteContract(idContract);
    res.json(contract);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getContractByLicensePlate(req, res) {

  const { licensePlate } = req.params;

  try {
    const contract = await Contract.getContractByLicensePlate(licensePlate);
    res.json(contract);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getContractsByAgency(req, res) {
  const { idAgency } = req.params;

  try {
    const contract = await Contract.getContractsByAgency(idAgency);
    res.json(contract);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getContractByClient (req,res) {

  const{idClient} = req.params;

  try{
      const contract = await Contract.getContractByClient(idClient);
      res.json(contract);

  }
  catch(error){
      console.error(error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
  }

}

module.exports = {
  getContracts,
  getContractById,
  createContract,
  updateContract, deleteContract,
  getContractByLicensePlate,
  getContractsByAgency,
  getContractByClient
};