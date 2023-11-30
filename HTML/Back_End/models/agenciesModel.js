const bcrypt = require('bcrypt');
const { execute } = require('../dbUtils/db.js');

async function getAllAgencies() {

    try {
        const query = "SELECT Id_Agency,Agency_Name,Address,Phone_Number,Email FROM AGENCY";
        const result = await execute(query);

        return result
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

async function getAgencyById(agencyID) {

    try {
        const query = "SELECT Id_Agency,Agency_Name,Address,Phone_Number,Email FROM AGENCY Where Id_Agency= ? ";
        const result = await execute(query, [agencyID]);

        return result
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

async function registerAdmin(registerData) {

    const { Agency_Name, Address, Phone_Number, Email, Password, isAdmin } = registerData;
    const saltRounds = 10;

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(registerData.Password + salt, salt);
        const query = 'INSERT INTO Agency (Agency_Name,Address,Phone_Number,Email, isAdmin, Password, Salt) VALUES (?,?,?,?,?,?,?)';
        const values = [Agency_Name, Address, Phone_Number, Email, true, hash, salt];
        const result = await execute(query, values);

        return result;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};

async function updateAgency(idAgency, agencyData) {

    const { Agency_Name, Address, Phone_Number, Email } = agencyData;
    const agencyExist = await getAgencyById(idAgency);


    try {
        if (!agencyExist || agencyExist.length === 0) {
            throw new Error("Agency doesn't exist ");
        }

        let query = "UPDATE agency SET ";
        const values = [];

        Object.keys(agencyData).forEach((key, index, array) => {
            if (agencyData[key] != undefined) {
                query += `${key} = ?`;
                values.push(agencyData[key]);
                if (index < array.length) {
                    query += ", ";
                }
            }
        });
        let rquery = query.slice(0, -2);
        rquery += " WHERE Id_Agency = ?";
        values.push(idAgency);
        const result = await execute(rquery, values);

        return result
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

async function deleteAgency(agencyID) {

    try {

        const deleteContractQuery = "DELETE contract FROM contract INNER JOIN car ON contract.License_Plate = car.License_Plate WHERE car.Id_Agency = ?;"
        await execute(deleteContractQuery, [agencyID]);
        const deleteCarsQuery = "DELETE FROM CAR WHERE Id_Agency = ?";
        await execute(deleteCarsQuery, [agencyID]);
        const deleteAgencyQuery = "DELETE FROM AGENCY WHERE Id_Agency = ?";
        const result = await execute(deleteAgencyQuery, [agencyID]);

        return result
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

async function getAgencyByEmail (email) {
    try {
        const query = 'SELECT * FROM Agency WHERE Email = ?';
        const values = [email];
        const result = await execute(query, values);
        return result[0]; 
    } catch (error) {
        console.error(error);
        throw error;
    }
}




module.exports = {
    getAllAgencies,
    getAgencyById,
    registerAdmin,
    updateAgency,
    deleteAgency,
    getAgencyByEmail
};