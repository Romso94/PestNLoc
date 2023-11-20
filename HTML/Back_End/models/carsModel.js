// - `getAllCars`: Récupère toutes les voitures.
// - `getCarById`: Récupère une voiture par son ID.
// - `createCar`: Crée une nouvelle voiture.
// - `updateCar`: Met à jour une voiture existante.
// - `deleteCar`: Supprime une voiture.

const {execute} = require ('../dbUtils/db');

const  getAllCars  = async () =>{
    try{

        const query = "SELECT * FROM car";
        const result = await execute(query);

        return result
        
    }catch(error){
        console.error(error);
        throw error;
    }
}
const  getCarById  = async (licensePlate) =>{
    try{

        const query = "SELECT * FROM car Where Id_Registration = ? ";
        const result = await execute(query,[licensePlate]);

        return result
        
    }catch(error){
        console.error(error);
        throw error;
    }
}
const  createCar  = async () =>{}
const  updateCar  = async () =>{}
const  deleteCar  = async () =>{}


module.exports = {getAllCars,getCarById,createCar,updateCar,deleteCar};