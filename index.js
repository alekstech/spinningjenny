const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/main', (req, res) => {

  const welcome = 'Welcome to the TM Volunteer Center API server'
  

  res.send(welcome);

});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  const welcome = 'Welcome to the TM Volunteer Center API server'
  
  res.send(welcome);
});

const port = process.env.PORT || 5035;
app.listen(port);

console.log(`App listening on ${port}`);