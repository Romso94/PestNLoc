const Client = require("../models/clientsModel");

async function getAllClient(req, res) {

    try {
        const clients = await Client.getAllClient();
        res.json(clients);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

async function getClientById(req, res) {
    const { idClient } = req.params;

    try {
        const clients = await Client.getClientById(idClient);
        res.json(clients);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

async function deleteClient(req, res) {

    const { idClient } = req.params;

    try {
        const clients = await Client.deleteClient(idClient);
        res.json(clients);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

module.exports = {
    getAllClient,
    getClientById,
    deleteClient
}