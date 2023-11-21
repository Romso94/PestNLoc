//- `getRentals`: Récupère la liste des locations de voitures.
// - `getRentalById`: Récupère une location de voiture par son identifiant.
// - `createRental`: Crée une nouvelle location de voiture.
// - `updateRental`: Met à jour une location de voiture existante.
// - `deleteRental`: Supprime une location de voiture.

const Rental = require ('../models/carsModel.js');

const getRentals = async (req,res) =>{
    try {
        const rentals = await Rental.getAllCars();
        res.json(rentals);
       
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}

const getRentalById = async (req,res) => {
    const {id} = req.params;
  try {
  const rentals = await Rental.getCarById(id);
  res.json(rentals);
 
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}

}

const createRental = async (req,res) => {
    
}

const updateRental = async (req,res) => {
    
}

const deleteRental = async (req,res) => {
    
}




module.exports = {getRentals,getRentalById,createRental,updateRental,deleteRental};