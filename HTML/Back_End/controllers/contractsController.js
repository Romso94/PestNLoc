
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

  const { Contract_Availability, Start_Date, Price, End_Date, Id_Client, License_Plate } = req.body;

  try {
    const dataContract = { Contract_Availability, Start_Date, Price, End_Date, Id_Client, License_Plate };
    const contracts = await Contract.createContract(dataContract);
    res.json(contracts);

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Internal Server Error' });
  }
}

async function updateContract(req, res) {

  const { idContract } = req.params;
  const { Contract_Availability, Start_Date, Price, End_Date, Id_Client, License_Plate } = req.body;

  try {

    const dataContract = { Contract_Availability, Start_Date, Price, End_Date, Id_Client, License_Plate };
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

module.exports = { getContracts, getContractById, createContract, updateContract, deleteContract, getContractByLicensePlate };