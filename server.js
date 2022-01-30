const fs = require('fs');
const express = require('express');
const path = require('path');
const database = require('./db/db.json')
const uuid1 = require('uuid1');

// Makes a constant for PORT to be used later to deploy
const PORT = process.env.PORT || 3001;

// Makes a constant for express as 'app'
const app = express();

// Middleware for parsing JSON and urlencoded form data from the public folder
// Serves the static files
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
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

app.get('/api/notes', (req, res) => {
  res.status(200).json(database);
});

// Code to add a review/note
// POST request to add a review
app.post('/api/notes', (req, res) => {
  // Prepare a response object to send back to the client
  // Check if there is anything in the response body
  const { title, text, id } = req.body;
  let response = { title, text, id: uuid1 };
  if (req.body) {
    database.push(response);
  } else {
    res.status(400).json('stop sucking');
  }
})



// app.post('/api/notes', (req, res) => {
//   const { title, text, id } = req.body;
// })

//this code will get specific reviews
// app.get('/api/reviews/:review_id', (req, res) => {
//   if (req.params.review_id) {
//     console.info(`${req.method} request received to get a single a review`);
//     const reviewId = req.params.review_id;
//     for (let i = 0; i < reviews.length; i++) {
//       const currentReview = reviews[i];
//       if (currentReview.review_id === reviewId) {
//         res.status(200).json(currentReview);
//         return;
//       }
//     }
//     res.status(404).send('Review not found');
//   } else {
//     res.status(400).send('Review ID not provided');
//   }
// });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);