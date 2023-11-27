
const bcrypt = require('bcrypt');
const { execute } = require('../dbUtils/db.js');

async function registerUser(registerData) {

    const { Name, LastName, Age, Address, Date_Permis_Issue, Email, Phone_Number, Password } = registerData;
    const saltRounds = 10;

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(registerData.Password, salt);
        const query = 'INSERT INTO Client (Name, LastName, Age, Address, Date_Permis_Issue, Email, Phone_Number, Password, Salt) VALUES (?,?,?,?,?,?,?,?,?)';
        const values = [Name, LastName, Age, Address, Date_Permis_Issue, Email, Phone_Number, hash, salt];
        const result = await execute(query, values);

        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

async function getAllClient() {

    try {
        const query = "SELECT Id_Client, Name, LastName, Age, Address, Date_Permis_Issue, Email, Phone_Number FROM client;";
        const result = await execute(query);

        return result;

    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

async function getClientById(idClient) {

    try {
        const query = "SELECT Id_Client, Name, LastName, Age, Address, Date_Permis_Issue, Email, Phone_Number FROM client WHERE Id_Client = ?";
        const result = await execute(query, [idClient]);

        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteClient(idClient) {

    try {
        const queryContract = "DELETE FROM contract Where Id_Client =?";
        const resultContract = await execute(queryContract, [idClient]);

        const queryClient = "DELETE FROM client Where Id_Client =?";
        const resultClient = await execute(queryClient, [idClient]);

        return resultClient

    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function updateClient(idClient,dataClient) {
    const {Name, LastName, Age, Address, Date_Permis_Issue, Email, Phone_Number} = dataClient;
    const clientExist = await getClientById(idClient);

    try{
        if (!clientExist || clientExist.length === 0){
            throw new Error("Client doesn't exist !");
        }

        let query = "UPDATE client SET ";
        const values = [];

        Object.keys(dataClient).forEach((key, index, array) => {
            if (dataClient[key] != undefined) {
                query += `${key} = ?`;
                values.push(dataClient[key]);
                if (index < array.length) {
                    query += ", ";
                }
            }
        });
        let rquery = query.slice(0, -2);
        rquery += " WHERE Id_Client = ?";
        values.push(idClient);
        const result = await execute(rquery, values);

        return result;

    }
    catch(error){
        console.error(error);
        throw error;
    }

}


module.exports = {
    registerUser,
    getAllClient,
    getClientById,
    deleteClient,
    updateClient
};
