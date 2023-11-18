const bcrypt = require('bcrypt');
const { execute } = require('../dbUtils/db.js');

const registerUser = async (registerData)  => {
    const {
        Name, LastName, Age, Address, Date_Permis_Issue, Email, Phone_Number, Password,
    } = registerData;
    
    const saltRounds = 10;

    try {
        // Génération du sel
        const salt = await bcrypt.genSalt(saltRounds);

        // Hachage du mot de passe avec le sel
        const hash = await bcrypt.hash(registerData.Password, salt);

        // Insertion dans la base de données
        const query = 'INSERT INTO Client (Name, LastName, Age, Adress, Date_Permis_Issue, Email, Phone_Number, Password) VALUES (?,?, ?, ?, ?, ?, ?, ?)';
        const values = [Name,LastName, Age, Address, Date_Permis_Issue, Email, Phone_Number, hash];

        const result = await execute(query, values);

        return result.insertId;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



module.exports = { registerUser };
