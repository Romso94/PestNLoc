const Clients = require('../models/clientsModel.js');

const registerUserController = async (req, res) => {
  const registerData = {
    Name : 'Florian',
    LastName: 'Doe',
    Age: 25,
    Address: '123 Main retgzgzeSt',
    Date_Permis_Issue: '2022-01-01', // Format YYYY-MM-DD
    Email: 'john.doee@example.com',
    Phone_Number: '095403495',
    Password: 'motdepasse123', // Vous devrez utiliser Bcrypt pour générer un hash sécurisé
  };

  try {
    const register = await Clients.registerUser(registerData);
    // res.json({ userId, message: 'Inscription réussie' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
};

async function loginUser(req, res) {
  const {email, password} = req.body;
  // Logique de connexion
}

module.exports = { registerUserController, loginUser };

