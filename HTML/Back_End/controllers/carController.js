
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
    
  const {Model,Brand,Fuel_State,Car_Power,Car_Type,Id_Agency,License_Plate} = req.body;
   
  try {

          const carRegister = {Model,Brand,Fuel_State,Car_Power,Car_Type,Id_Agency,License_Plate};
          const cars = await Car.createCar(carRegister);
          res.json(cars);
        } 
        catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
}

const updateCar = async (req,res) => {

  const {Model,Brand,Fuel_State,Car_Power,Car_Type,Id_Agency} = req.body;
  const {licensePlate}= req.params;

    try {

          const carRegister = {Model,Brand,Fuel_State,Car_Power,Car_Type,Id_Agency};
          const cars = await Car.updateCar(licensePlate,carRegister);
          res.json(cars);
        } 
        catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
}

const deleteCar = async (req,res) => {

  const {licensePlate} = req.params;
    
    try {
          const cars = await Car.deleteCar(licensePlate);
          res.json(cars);
        } 
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
}

module.exports = {getCars,getCarById,createCar,updateCar,deleteCar};