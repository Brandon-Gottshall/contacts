const cors = require('cors');

// Import express
const express = require('express');

// Import our database queries
const db = require('./queries');

// Create an instance of express
const app = express();

// Set the port to 3001
const port = 3000;

// Use the express json middleware
app.use(express.json());
app.use(cors());

// Create a route for the root of the app
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// GETs

// GET /contacts
app.get('/contacts', db.get.contacts);

// GET /contacts/:id
app.get('/contact/:id', db.get.contact);


// POSTs
app.post('/contacts', db.post.contacts);

//Deletes
app.delete("/contact/:id", db.delete.contact)

//PUTs
app.put('/contacts', db.update.contact);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});