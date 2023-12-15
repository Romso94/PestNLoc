
const { execute } = require('../dbUtils/db.js');
const Car = require('../models/carsModel.js');

async function getCars(req, res) {

  try {
    const cars = await Car.getAllCars();
    res.json(cars);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getCarById(req, res) {

  const { licensePlate } = req.params;

  try {
    const cars = await Car.getCarById(licensePlate);
    res.json(cars);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createCar(req, res) {

  const { Model, Brand,isReserved, Car_Power, Car_Type, Id_Agency, License_Plate } = req.body;

  try {
    
    const carRegister = { Model, Brand,isReserved, Car_Power, Car_Type, Id_Agency, License_Plate };
    const cars = await Car.createCar(carRegister);
    res.json(cars);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
 
async function updateCar(req, res) {

  const { Model, Brand, isReserved, Car_Power, Car_Type, Id_Agency } = req.body;
  const { licensePlate } = req.params;

  try {

    const carRegister = { Model, Brand, isReserved, Car_Power, Car_Type, Id_Agency };
    const cars = await Car.updateCar(licensePlate, carRegister);
    res.json(cars);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteCar(req, res) {

  const { licensePlate } = req.params;

  try {
    const cars = await Car.deleteCar(licensePlate);
    res.json(cars);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAllCarByAgencyId(req, res) {

  const { idAgency } = req.params;
  try {
    const cars = await Car.getAllCarByAgencyId(idAgency);
    res.json(cars);

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { getCars, getCarById, createCar, updateCar, deleteCar, getAllCarByAgencyId };