const fs = require('fs');
const express = require('express');
const path = require('path');
const database = require('./db/db.json')
const uniqid = require('uniqid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
  res.status(200).json(database);
});

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.post('/api/notes', (req, res) => {
  const {
    title,
    text,
    id
  } = req.body;
  if (title && text) {
    let response = {
      title,
      text,
      id: uniqid()
    };
    database.push(response);
    fs.writeFile(`./db/db.json`, JSON.stringify(database), (err) =>
      err ?
      console.error(err) :
      console.log(
        "new note added"
      )
    );
    res.send("note added");
  } else {
    res.status(400).json('Sorry!');
  }
})

app.delete('/api/notes/:id', (req, res) => {
  // const {
  //   id
  // } = req.body;
  // const ddbase = [];
  // set array position to 0
  // check element at 0
  //if element at 0 !== id, filter out
  //push filtered elements to new array
  //set array position to next element
  for (i = 0; i < database.length; i++) {
    // console.log(database[i]);
    if (req.params.id === database[i].id) {
      database.splice(i, 1);
      console.log(database);
      fs.writeFile(`./db/db.json`, JSON.stringify(database), (err) =>
        err ?
        console.error(err) :
        console.log(
          "Note removed"
        )
      );
      res.send("removed");
      return;
    }
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);