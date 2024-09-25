const express = require('express');
const router = express.Router();

const usersController = require('../controllers/contacts.js');

// get all data
router.get('/', usersController.getAll);

// get single user
router.get('/:id', usersController.getSingle);

module.exports = router;
