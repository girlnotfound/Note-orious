// sets up API route handling for notes

// imports necessary modules: 'express', 'fs', 'path', and 'uuid'
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const router = express.Router(); // create a new router object

// GET /api/notes to read and return all notes
router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Oops! Failed to fetch your notes.'}); // handle errors
    } else {
      res.json(JSON.parse(data)); // send the data as JSON
    }
  });
});

// POST /api/notes to save and return a new note
router.post('/', (req, res) => {
  const { title, text } = req.body; // get title and text from request body
  if (title && text) {
    const newNote = { id: uuidv4(), title, text }; // create a new note with a unique ID
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
      if (err) {
        res.status(500).json({ error: 'Oops! Failed to retrieve your notes.' }); 
      } else {
        const notes = JSON.parse(data); // parse existing notes
        notes.push(newNote); // add new note to notes array
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 4), (err) => {
          if (err) {
            res.status(500).json({ error: 'Oops! Failed to save note.' }); 
          } else {
            console.log('Yay! New note has been added!'); // confirmation log
            res.json(newNote); // send the new note back to the user
          }
        });
      }
    });
  } else {
    res.status(400).json({ error: 'Oops! Error in adding note' }); // handle invalid input
  }
});

