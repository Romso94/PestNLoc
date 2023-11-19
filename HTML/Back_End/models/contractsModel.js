// - Fonctions :
//     - `getAllContracts`: Récupère tous les contrats.
//     - `getContractById`: Récupère un contrat par son ID.
//     - `createContract`: Crée un nouveau contrat.
//     - `updateContract`: Met à jour un contrat existant.
//     - `deleteContract`: Supprime un contrat.

const { execute } = require('../dbUtils/db.js');

const getAllContracts = async () => {
    try{

        const query = "SELECT * FROM CONTRACT";
        const result = await execute(query);

        return result
        
    }catch(error){
        console.error(error);
        throw error;
    }
}

const getContractById = async (contractsID) => {}

const createContract = async (contractsData) => {}

const updateContract = async (contractsUpdateData) => {}

const deleteContract = async (contractsID) => {}


module.exports = { getAllContracts, getContractById, createContract, updateContract, deleteContract};