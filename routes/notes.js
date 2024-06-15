// sets up API route handling for notes

// imports necessary modules: 'express', 'fs', 'path', and 'uuid'
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const router = express.Router(); // create a new router object

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read notes data.' }); // handle errors
    } else {
      res.json(JSON.parse(data)); // send the data as JSON
    }
  });
});
