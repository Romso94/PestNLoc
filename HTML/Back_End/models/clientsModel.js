import { execute } from '../dbUtils/db.js';

export async function registerUser(registerData) {
    const {
        LastName, Age, Address, Date_Permis_Issue, Email, Phone_Number, Password, } = registerData;

    try {
        const query = 'INSERT INTO Clients (LastName, Age, Address, Date_Permis_Issue, Email, Phone_Number, Password) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [LastName, Age, Address, Date_Permis_Issue, Email, Phone_Number, Password];

        const [result] = await execute(query, values);

        return result.insertId;
    } catch (error) {
        console.error(error);
        throw error;
    }
}