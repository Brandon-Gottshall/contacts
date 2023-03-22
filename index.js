// Import express
const express = require('express');

// Import our database queries
const db = require('./queries');

// Create an instance of express
const app = express();

// Set the port to 3001
const port = 3001;

// Use the express json middleware
app.use(express.json());

// Create a route for the root of the app
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// GETs

// GET /contacts
app.get('/contacts', db.get.contacts);

// GET /emails
app.get('/emails', db.get.emails);

// POSTs
app.post('/contacts', db.post.contacts);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});