// sets up route handling 

// imports neccessary modules: 'express' and 'path' and initialize express router
const express = require('express');
const path = require('path');
const router = express.Router();

// GET /notes should return the notes.html file.
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html')); // send notes.html file when '/notes' is requested
});

// GET * should return the index.html file.
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html')); // send index.html file for all other requests
});

module.exports = router; // export the router object for use in other parts of the application
