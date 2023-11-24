// Locations de voitures (`rentController.js`) :**
//     - `getRentals`: Récupère la liste des locations de voitures.
//     - `getRentalById`: Récupère une location de voiture par son identifiant.
//     - `createRental`: Crée une nouvelle location de voiture.
//     - `updateRental`: Met à jour une location de voiture existante.
//     - `deleteRental`: Supprime une location de voiture.

const Agencies = require('../models/agenciesModel.js');

const getAllAgencies = async (req, res) => {
    
    try {
      const agencies = await Agencies.getAllAgencies();
      res.json(agencies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


const getAgencyById = async (req,res) =>{
  
  const {idAgency} = req.params;
    
  try {
          const agency= await Agencies.getAgencyById(idAgency);
          res.json(agency);
  }
  catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



const createAgency = async (req,res) =>{
  
}

const updateAgency = async (req,res) =>{}

const deleteAgency = async (req,res) =>{
  const {idAgency} = req.params;
  try {
  const agencies = await Agencies.deleteAgency(idAgency);
    res.json(Agencies);
  
} 
catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}

}

module.exports = {getAllAgencies, getAgencyById,deleteAgency};