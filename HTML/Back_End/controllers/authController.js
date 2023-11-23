const clients = require ("../models/clientsModel")

const registerUserController = async (req, res) => {
    
  const { Name, LastName, Age, Address, Date_Permis_Issue, Email, Phone_Number, Password } = req.body;
     
    try {
          const registerData = {Name,LastName,Age,Address,Date_Permis_Issue,Email,Phone_Number,Password};
          const register = await clients.registerUser(registerData);  
          res.json(register);
          } 
          catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
          }
};

// A terminer
async function loginUser(req, res) {
  const {email, password} = req.body;
  // Logique de connexion
}

module.exports = { registerUserController, loginUser };

