
// - `createCar`: Crée une nouvelle Voiture de location.
// - `updateCar`: Met à jour une location de voiture existante.
// - `deleteCar`: Supprime une location de voiture.

const Car = require ('../models/carsModel.js');

const getCars = async (req,res) =>{
    
  try {
        const cars = await Car.getAllCars();
        res.json(cars);
      } 
      catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}

const getCarById = async (req,res) => {
    
    const {id} = req.params;
    
    try {
          const cars = await Car.getCarById(id);
          res.json(cars);
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

}

const createCar = async (req,res) => {
    
  const {Model,Brand,Fuel_State,Car_Power,Car_Type,Id_Agency,Register_Plate} = req.body;
   
  try {
          const carRegister = {Model,Brand,Fuel_State,Car_Power,Car_Type,Id_Agency,Register_Plate};
          const cars = await Car.createCar(carRegister);
          res.json(cars);
        } 
        catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
}

const updateCar = async (req,res) => {
    
}

const deleteCar = async (req,res) => {
    
}




module.exports = {getCars,getCarById,createCar,updateCar,deleteCar};