// Locations de voitures (`rentController.js`) :**
//     - `getRentals`: Récupère la liste des locations de voitures.
//     - `getRentalById`: Récupère une location de voiture par son identifiant.
//     - `createRental`: Crée une nouvelle location de voiture.
//     - `updateRental`: Met à jour une location de voiture existante.
//     - `deleteRental`: Supprime une location de voiture.

const Agencies = require('../models/agenciesModel.js');

const getRentals = async (req, res) => {
    try {
      const agencies = await Agencies.getAllAgencies();
      res.json(agencies);
      console.log(agencies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


const getRentalById = async (req,res) =>{
  const {id} = req.params;
  try {
const agency= await Agencies.getAgencyById(id);
  res.json(agency);
  console.log(agency);
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
}



const createRental = async (req,res) =>{
  
}

const updateRental = async (req,res) =>{}

const deleteRental = async (req,res) =>{
  const {id} = req.params;
  try {
  const agencies = await Agencies.deleteAgency(id);
    res.json(Agencies);
  console.log("Delete Successfull");
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}

}

module.exports = {getRentals, getRentalById, createRental, updateRental, deleteRental};