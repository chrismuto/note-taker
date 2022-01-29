const fs = require('fs');
const express = require('express');
const path = require('path');
// const api = require('./public/assets/js/index');

// Makes a constant for PORT to be used later to deploy
const PORT = process.env.PORT || 3001;

// Makes a constant for express as 'app'
const app = express();

// Middleware for parsing JSON and urlencoded form data from the public folder
// Serves the static files
// app.use('/api', api);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Gets the routes to the public doc
// Gets the index.html route
// GET * should return the index.html file.
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET /notes should return the notes.html file.
// Gets the notes.html route
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);