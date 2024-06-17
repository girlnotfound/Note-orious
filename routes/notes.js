// sets up API route handling for notes

// imports necessary modules: 'express', 'fs', 'path', and 'uuid'
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router(); // create a new router object

// reads data from the specified file and returns a promise
const readFromFile = (filePath) =>
  new Promise((resolve, reject) =>
    fs.readFile(filePath, 'utf8', (err, data) =>
      err ? reject(err) : resolve(data)
    )
  );

// writes data to the specified file and returns a promise
const writeToFile = (filePath, content) =>
  new Promise((resolve, reject) =>
    fs.writeFile(filePath, JSON.stringify(content, null, 4), (err) =>
      err ? reject(err) : resolve()
    )
  );

// function to generate a random 4-digit ID
const generateRandomId = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// GET /api/notes to read and return all notes
router.get('/', async (req, res) => {
  try {
    const data = await readFromFile(path.join(__dirname, '../db/db.json'));
    res.json(JSON.parse(data)); // send the data as JSON
  } catch (err) {
    res.status(500).json({ error: 'Oops! Failed to fetch your notes.' });
  } // handle errors
});

// POST /api/notes to save and return a new note
router.post("/", async (req, res) => {
  try {
    const { title, text } = req.body; // get title and text from request body
    const newNote = { id: generateRandomId(), title, text }; // create a new note with a unique ID
    const data = await readFromFile(path.join(__dirname, "../db/db.json"));  // read existing notes
    const notes = JSON.parse(data);  // parse existing notes
    notes.push(newNote); // add new note to the array
    await writeToFile(path.join(__dirname, "../db/db.json"), notes); // save the updated notes
    res.json(newNote); // send back the new note
  } catch (err) {
    res.status(500).json({ error: "Oops! Failed to save note." }); // handle errors
  }
});

// DELETE /api/notes/:id to delete a note by ID
router.delete("/:id", async (req, res) => {
  const noteId = req.params.id; // get note ID from request parameters
  const data = await readFromFile(path.join(__dirname, "../db/db.json")); // read the notes data
  const notes = JSON.parse(data); // parse the notes data
  const noteIndex = notes.findIndex((note) => note.id === noteId); // find the index of the note to delete

  if (noteIndex === -1) {
    return res.status(404).json({ error: "Oops! Note has not been found." }); // handle errors
  }

  const updatedNotes = notes.filter((note) => note.id !== noteId); //remove note from the array
  await writeToFile(path.join(__dirname, "../db/db.json"), updatedNotes); // write the updated notes to the file
  res.json({ message: "Note has been deleted successfully." }); // send success message
});

module.exports = router; // export the router object for use in other parts of the application


