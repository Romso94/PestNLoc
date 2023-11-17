import Clients from '../models/clientsModel.js';

export async function registerUser (req,res)  {
    const registerData = req.body; 
    
    try {
            const register = await Clients.registerUser(registerData);
            res.json({ userId, message: 'Inscription Successfull' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
    }

    loginUser : async(req,res) =>
    {
        const { email, password } = req.body;
    }
}


