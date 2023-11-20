const Clients = require('../models/clientsModel.js');

const registerUserController = async (req, res) => {
  const registerData = req.body;

  try {
    const register = await Clients.registerUser(registerData);
    res.json(register);
  } catch (error) {
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

