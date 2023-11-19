// - `getContracts`: Récupère la liste des contrats de location.
// - `getContractById`: Récupère un contrat de location par son identifiant.
// - `createContract`: Crée un nouveau contrat de location.
// - `updateContract`: Met à jour un contrat de location existant.
// - `deleteContract`: Supprime un contrat de location.

const Contract = require('../models/contractsModel');

const getContracts = async (req, res) => {
    try {
      const contracts = await Contract.getAllContracts();
      res.json(contracts);
      console.log(contracts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const getContractById = async (req,res) =>{}

const createContract = async (req,res) =>{}

const updateContract = async (req,res) =>{}

const deleteContract = async (req,res) =>{}

module.exports = {getContracts, getContractById, createContract, updateContract, deleteContract};