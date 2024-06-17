// set up of express server

// import essential modules: 'express' and route handlers for 'notes.js' and 'html.js'
const express = require('express'); 
const apiRoutes = require('./routes/notes'); 
const htmlRoutes = require('./routes/html'); 

const app = express(); // create an Express application
const PORT = 3001; // set the port to 3001

// middleware
app.use(express.json()); // parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // parse URL-encoded requests
app.use(express.static('public')); // serve static files from the 'public' directory

// routes
app.use('/api/notes', apiRoutes); // use API routes for '/api/notes'
app.use('/', htmlRoutes); // use HTML routes for the root path

app.listen(PORT, () => { // start the server
  console.log(`API server now on port http://localhost:${PORT}`); // log the server start message
});