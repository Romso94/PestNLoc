
const Agencies = require('../models/agenciesModel.js');

const getAllAgencies = async (req, res) => {

  try {
    const agencies = await Agencies.getAllAgencies();
    res.json(agencies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAgencyById = async (req, res) => {

  const { idAgency } = req.params;

  try {
    const agency = await Agencies.getAgencyById(idAgency);
    res.json(agency);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const createAgency = async (req, res) => {

  const { Agency_Name, Address, Phone_Number, Email, Password } = req.body;

  try {
    const dataAgency = { Agency_Name, Address, Phone_Number, Email, Password };
    const agencies = await Agencies.createAgency(dataAgency);
    res.json(agencies);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateAgency = async (req, res) => {

  const { idAgency } = req.params;
  const { Agency_Name, Address, Phone_Number, Email } = req.body;

  try {
    const dataAgency = { Agency_Name, Address, Phone_Number, Email };
    const agencies = await Agencies.updateAgency(idAgency, dataAgency);
    res.json(agencies);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const deleteAgency = async (req, res) => {

  const { idAgency } = req.params;
  try {
    const agencies = await Agencies.deleteAgency(idAgency);
    res.json(agencies);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllAgencies,
  getAgencyById,
  deleteAgency,
  createAgency,
  updateAgency,
  
};