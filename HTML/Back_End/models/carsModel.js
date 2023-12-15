
const { execute } = require('../dbUtils/db');
const { getAgencyById } = require('./agenciesModel');

async function getAllCars() {

    try {
        const query = "SELECT * FROM car";
        const result = await execute(query);

        return result
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

async function getCarById(licensePlate) {

    try {
        const query = "SELECT * FROM car Where License_Plate = ? ";
        const result = await execute(query, [licensePlate]);

        return result
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

async function createCar(carRegister) {

    const { Model, Brand,isReserved, Car_Power, Car_Type, Id_Agency, License_Plate } = carRegister;
    const agencyExist = await getAgencyById(Id_Agency);

    try {
        if (!agencyExist || agencyExist.length === 0) {
            throw new Error("Agency doesn't exist !");
        }
        
        const query = "INSERT INTO car (Model,Brand,isReserved,Car_Power,Car_Type,Id_Agency,License_Plate) VALUES (?,?,?,?,?,?,?)";
        const values = [Model, Brand, isReserved, Car_Power, Car_Type, Id_Agency, License_Plate];
        const result = await execute(query, values);

        return result

    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

async function updateCar(licensePlate, carRegister) {

    const carExist = await getCarById(licensePlate);
    const { Model, Brand, isReserved, Car_Power, Car_Type, Id_Agency } = carRegister;
    if (Id_Agency != undefined) {
        const agencyExist = await getAgencyById(Id_Agency);

        if (!agencyExist || agencyExist.length === 0) {
            throw new Error("Agency doesn't exist !");
        }
    }

    try {
        if (!carExist || carExist.length === 0) {
            throw new Error("Car doesn't exist in the Database!");
        }

        let query = "UPDATE car SET ";
        const values = [];

        Object.keys(carRegister).forEach((key, index, array) => {
            if (carRegister[key] != undefined) {
                query += `${key} = ?`;
                values.push(carRegister[key]);
                if (index < array.length) {
                    query += ", ";
                }
            }
        });
        let rquery = query.slice(0, -2);
        rquery += " WHERE License_Plate = ?";
        values.push(licensePlate);
        const result = await execute(rquery, values);

        return result
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteCar(licensePlate) {

        console.log(licensePlate)
    try {
        const query = "DELETE  FROM contract  Where License_Plate = ? ";
        const result = await execute(query, [licensePlate]);

        const queryCar = "DELETE FROM car where License_Plate = ?;";
        const newResult = await execute(queryCar,[licensePlate]);

        return newResult;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

async function getAllCarByAgencyId(agencyID) {

    const agencyExist = await getAgencyById(agencyID);

    try {
        if (!agencyExist || agencyExist.length === 0) {
            throw new Error("Agency doesn't exist !");
        }

        const query = "SELECT * FROM car WHERE Id_Agency = ?;";
        const result = await execute(query, [agencyID]);

        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports = { getAllCars, getCarById, createCar, updateCar, deleteCar, getAllCarByAgencyId };