
const {execute} = require ('../dbUtils/db');

const  getAllCars  = async () =>{
    
    try{
        const query = "SELECT * FROM car";
        const result = await execute(query);

        return result
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

const  getCarById  = async (licensePlate) =>{
    
    try{
        const query = "SELECT * FROM car Where License_Plate = ? ";
        const result = await execute(query,[licensePlate]);

        return result 
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

const  createCar  = async (carRegister) =>{
    
    const {Model,Brand,Fuel_State,Car_Power,Car_Type,Id_Agency,License_Plate} = carRegister;
    
    try{
        const query = "INSERT INTO car (Model,Brand,Fuel_State,Car_Power,Car_Type,Id_Agency,License_Plate) VALUES (?,?,?,?,?,?,?)";
        const  values = [Model,Brand,Fuel_State,Car_Power,Car_Type,Id_Agency,License_Plate];
        const result = await execute(query,values);

        return result
        
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

const  updateCar  = async (licensePlate,carRegister) =>{

    const carExist = await getCarById(licensePlate);
    const {Model,Brand,Fuel_State,Car_Power,Car_Type,Id_Agency} = carRegister;

    try{
        if (!carExist || carExist.length === 0) {
            throw new Error("Car doesn't exist in the Database!");
          }
        
        let query = "UPDATE car SET ";
        const values = [];
        
        Object.keys(carRegister).forEach((key, index, array) => {
                console.log(carRegister[key]);
                if(carRegister[key] != undefined){
                    query += `${key} = ?`;
                    values.push(carRegister[key]);
                    if (index < array.length - 1) {
                        query += ", ";
                    }
                }
        });
            query += " WHERE License_Plate = ?";
            values.push(licensePlate);
            const result = await execute(query, values);

            return result
        }
        catch(error){
            console.error(error);
            throw error;
    }
}

const  deleteCar  = async (licensePlate) =>{

    try{
        const query = "DELETE contract,car FROM contract JOIN car ON contract.License_Plate=car.License_Plate  Where contract.License_Plate = ? ";
        const result = await execute(query,[licensePlate]);

        return result 
    }
    catch(error){
        console.error(error);
        throw error;
    }
}


module.exports = {getAllCars,getCarById,createCar,updateCar,deleteCar};