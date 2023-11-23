// - `getContracts`: Récupère la liste des contrats de location.
// - `getContractById`: Récupère un contrat de location par son identifiant.
// - `createContract`: Crée un nouveau contrat de location.
// - `updateContract`: Met à jour un contrat de location existant.
// - `deleteContract`: Supprime un contrat de location.

const Contract = require('../models/contractsModel.js');

const getContracts = async (req, res) => {
    
  try {
      const contracts = await Contract.getAllContracts();
      res.json(contracts);
    }
     catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const getContractById = async (req,res) =>{
      const {id} = req.params;
      try {
            const contract = await Contract.getContractById(id);
            res.json(contract);
    } 
    catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createContract = async (req,res) =>{
    const {Contract_Availability,Start_Date,Price,End_Date,Id_Client,License_Plate} = req.body;

    try{
      const dataContract = {Contract_Availability,Start_Date,Price,End_Date,Id_Client,License_Plate};
      const contracts = await Contract.createContract(dataContract);
      res.json(contracts);

    }
    catch(error){
      console.error(error);
      res.status(500).json({erro: 'Internal Server Error'});
    }
}

const updateContract = async (req,res) =>{
  
  const {idContract} = req.params;
  const {Contract_Availability,Start_Date,Price,End_Date,Id_Client,License_Plate} = req.body;

  try{

      const dataContract = {Contract_Availability,Start_Date,Price,End_Date,Id_Client,License_Plate};
      const contracts = await Contract.updateContract(idContract,dataContract);
      res.json(contracts);
  }
  catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });

  }
 }

const deleteContract = async (req,res) =>{
      
  const {id} = req.params;
      
      try {
            const contract = await Contract.deleteContract(id);
            res.json(contract);
          } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {getContracts, getContractById, createContract, updateContract, deleteContract};