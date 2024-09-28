const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId; // primary key
const dbName = 'cse341_w01';
const collectionName = 'contacts';

const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db(dbName)
    .collection(collectionName)
    .find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db(dbName)
    .collection(collectionName)
    .find({ _id: userId });
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

// TODO: createUser, updateUser, deleteUser
const createUser = async (req, res) => {
  const user = {
    // pull information from request
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor
  };
  // Send request to create user
  const response = await mongodb
    .getDatabase()
    .db(dbName)
    .collection(collectionName)
    .insertOne(user);
  // Track request to create user
  if (response.acknowledged) {
    res.status(204).send(); // 204: No Content
  }
  else {
    res.status(500).json(response.error || 'Unknown error occurred while updating the user.');
  }
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    // pull information from request
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor
  };
  // Send request to create user
  const response = await mongodb
    .getDatabase()
    .db(dbName)
    .collection(collectionName)
    .replaceOne({ _id: userId }, user);
  // Track request to create user
  if (response.modifiedCount > 0) {
    res.status(204).send(); // 204: Successfully completed, no response payload body.
  }
  else {
    res.status(500).json(response.error || 'Unknown error occurred while updating the user.');
    // 500: Server encountered an unexpected condition that prevented it from fulfilling the request.
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // Send request to create user
  const response = await mongodb
    .getDatabase()
    .db(dbName)
    .collection(collectionName)
    .deleteOne({ _id: userId });
  // Track request to create user
  if (response.deletedCount > 0) {
    res.status(204).send(); // 204: No Content
  }
  else {
    res.status(500).json(response.error || 'Unknown error occurred while updating the user.');
  }
};

module.exports = {
  getAll,
  getSingle, 
  createUser,
  updateUser,
  deleteUser
};
