// Creer un clientController

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

async function getClientById(idClient) {

    try {
        const query = "SELECT * FROM client WHERE Id_Client = ?";
        const result = await execute(query, [idClient]);

        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}



module.exports = { registerUser, getClientById };
