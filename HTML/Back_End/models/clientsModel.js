const bcrypt = require('bcrypt');
const { execute } = require('../dbUtils/db.js');

const registerUser = async (registerData)  => {

    // Add the salt to the db 
    
    const {Name, LastName, Age, Address, Date_Permis_Issue, Email, Phone_Number, Password} = registerData;
    const saltRounds = 10;

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(registerData.Password, salt);
        const query = 'INSERT INTO Client (Name, LastName, Age, Address, Date_Permis_Issue, Email, Phone_Number, Password) VALUES (?,?, ?, ?, ?, ?, ?, ?)';
        const values = [Name,LastName, Age, Address, Date_Permis_Issue, Email, Phone_Number, hash];
        const result = await execute(query, values);
        
        return result;
    } 
    catch (error) {
        console.error(error);
        throw error;
    }
};

const getClientById = async (idClient) =>{

    try {
        const query = "SELECT * FROM client WHERE Id_Client = ?";        
        const result = await execute(query,[idClient]);

        return result;
    }
    catch(error){
        console.error(error);
        throw error;
    }
}



module.exports = { registerUser, getClientById };
