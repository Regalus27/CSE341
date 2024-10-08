const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts.js');
const validation = require('../middleware/validate.js');

// get all data
router.get('/', contactsController.getAll);

// get single user
router.get('/:id', contactsController.getSingle);

// W02 Work
// Add a post (add contact to database)
router.post('/', validation.saveContact, contactsController.createUser);

// Add a put (update contact)
router.put('/:id', validation.saveContact, contactsController.updateUser);

// Add a delete (remove contact)
router.delete('/:id', contactsController.deleteUser);


module.exports = router;
