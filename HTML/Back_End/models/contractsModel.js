
const { getAgencyById } = require('./agenciesModel.js');
const { execute } = require('../dbUtils/db.js');
const { getCarById } = require('./carsModel.js');
const { getClientById } = require('./clientsModel.js');

async function getAllContracts() {

    try {
        const query = "SELECT * FROM CONTRACT";
        const result = await execute(query);

        return result

    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getContractById(contractsID) {

    try {
        const query = "SELECT * FROM CONTRACT Where Id_Contract= ? ";
        const result = await execute(query, [contractsID]);

        return result

    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function createContract(contractsData) {

    const { Contract_Availability, Start_Date, Price, End_Date, Id_Client, License_Plate } = contractsData;
    const carExist = await getCarById(License_Plate);
    const clientExist = await getClientById(Id_Client);

    try {
        if (!carExist || carExist.length === 0) {
            throw new Error("Car doesn't exist in the Database!");
        }
        if (!clientExist || clientExist.length === 0) {
            throw new Error("Client doesn't exist in the Database!");
        };

        const query = "INSERT INTO contract (Contract_Availability,Start_Date,Price,End_Date,Id_Client,License_Plate) VALUES (?,?,?,?,?,?)";
        const values = [Contract_Availability, Start_Date, Price, End_Date, Id_Client, License_Plate];
        const result = await execute(query, values);

        return result;
    }
    catch (error) {
        console.error(error)
        throw error;
    }
}

async function updateContract(idContract, contractsData) {

    const { Contract_Availability, Start_Date, Price, End_Date, Id_Client, License_Plate } = contractsData;
    const contractExist = await getContractById(idContract);

    if (Id_Client != undefined) {
        const clientExist = await getClientById(Id_Client);
        if (!clientExist || clientExist.length === 0) {
            throw new Error("Client doesn't exist !");
        }

    };
    if (License_Plate != undefined) {
        const carExist = await getCarById(License_Plate);
        if (!carExist || carExist.length === 0) {
            throw new Error("Car doesn't exist !");
        }
    };

    try {

        if (!contractExist || contractExist.length === 0) {
            throw new Error("Contract doesn't exist !");
        }

        let query = "UPDATE contract SET ";
        const values = [];

        Object.keys(contractsData).forEach((key, index, array) => {
            if (contractsData[key] != undefined) {
                query += `${key} = ?`;
                values.push(contractsData[key]);
                if (index < array.length) {
                    query += ", ";
                }
            }
        });
        let rquery = query.slice(0, -2);
        rquery += " WHERE Id_Contract = ?";
        values.push(idContract);
        console.log(rquery);
        const result = await execute(rquery, values);

        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteContract(contractsID) {

    try {
        const query = "DELETE FROM CONTRACT Where Id_Contract=?";
        const result = await execute(query, [contractsID]);

        return result

    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function getContractByLicensePlate(licensePlate) {

    const carExist = await getCarById(licensePlate);

    try {
        if (!carExist || carExist.length === 0) {
            throw new Error("Car doesn't exist !");
        }

        const query = " SELECT * FROM contract where contract.License_Plate = ?;";
        const result = await execute(query, [licensePlate]);

        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

async function getContractsByAgency(idAgency) {

    const agencyExist = await getAgencyById(idAgency);

    try {
        if (!agencyExist || agencyExist.length === 0) {
            throw new Error("Agency doesn't exist !")
        }
        const query = "SELECT Contract.* FROM Contract JOIN Car ON Contract.License_Plate = Car.License_Plate WHERE Car.Id_Agency = ?;";
        const result = await execute(query, [idAgency]);

        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports = {
    getAllContracts,
    getContractById,
    createContract,
    updateContract,
    deleteContract,
    getContractByLicensePlate,
    getContractsByAgency
};