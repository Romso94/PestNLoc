const clients = require("../models/clientsModel");
const agency = require("../models/agenciesModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerUserController(req, res) {
  const {
    Name,
    LastName,
    YearOfBirth,
    Address,
    Date_Permis_Issue,
    Email,
    Phone_Number,
    Password,
    Country,
    Gender,
    isAdmin,
  } = req.body;

  try {
    const registerData = {
      Name,
      LastName,
      YearOfBirth,
      Address,
      Date_Permis_Issue,
      Email,
      Phone_Number,
      Password,
      Country,
      Gender
    };
    const register = await clients.registerUser(registerData);
    res.json(register);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

async function loginUser(req, res) {
  const { Email, Password } = req.body;

  try {
    const user = await clients.getUserByEmail(Email);

    if (!user) {
      return res.status(401).json({ msg: "Identifiants invalides" });
    }

    const isPasswordMatch = await bcrypt.compare(
      Password + user.Salt,
      user.Password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Mot de passe invalides" });
    }

    const token = jwt.sign(
      { user: { id: user.Id_Client, role: user.isAdmin ? 'admin' : 'user' } },
      process.env.JWT_SECRET,
      {expiresIn : "1h"}
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

async function registerAdminController(req, res) {
  const { Agency_Name, Address, Phone_Number, Email, Password, isAdmin } =
    req.body;

  try {
    const registerData = {
      Agency_Name,
      Address,
      Phone_Number,
      Email,
      Password,
      isAdmin,
    };
    const register = await agency.registerAdmin(registerData);
    res.json(register);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

async function loginAdmin(req, res) {
  const { Email, Password } = req.body;

  try {
    const user = await agency.getAgencyByEmail(Email);

    if (!user) {
      return res.status(401).json({ msg: "Identifiants invalides" });
    }

    const isPasswordMatch = await bcrypt.compare(
      Password + user.Salt,
      user.Password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Mot de passe invalides" });
    }

    const token = jwt.sign(
      { user: { id: user.Id_Agency, role: user.isAdmin ? 'admin' : 'user' } },
      process.env.JWT_SECRET,
      {expiresIn : "1h"}
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

module.exports = {
  registerUserController,
  loginUser,
  registerAdminController,
  loginAdmin,
};
