// - `getAllAgencies`: Récupère toutes les agences.
// - `getAgencyById`: Récupère une agence par son ID.
// - `createAgency`: Crée une nouvelle agence.
// - `updateAgency`: Met à jour une agence existante.
// - `deleteAgency`: Supprime une agence.

const getAllAgencies = async () => {
    
    try{
        const query = "SELECT * FROM AGENCY";
        const result = await execute(query);

        return result
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

const getAgencyById = async (agencyID) => {
   
    try{
        const query = "SELECT * FROM AGENCY Where Id_Agency= ? ";
        const result = await execute(query,[agencyID]);

        return result  
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

const createAgency = async (agencyData) => {
    
    try {
        const { name, location } = agencyData; 
        const query = "INSERT INTO AGENCY (Agency_name, Location) VALUES (?, ?)";
        const result = await execute(query, [name, location]);

        return result;
    } 
    catch (error) {
        console.error(error);
        throw error;
    }
}; 

const updateAgency = async (agencyUpdateData) => {}

const deleteAgency = async (agencyID) => {
    
    try{
        const query = "DELETE FROM AGENCY Where Id_Agency=?";
        const result = await execute(query,[agencyID]);

        return result  
    }
    catch(error){
        console.error(error);
        throw error;
    }

}


module.exports = { getAllAgencies, getAgencyById, createAgency, updateAgency, deleteAgency};