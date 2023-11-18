const express = require('express');
const router = express.Router();

const { registerUserController } = require('../controllers/authController.js');

// Routes pour l'authentification
router.get('/api/register', registerUserController);

module.exports = router;
