require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3030;

const cloudinary = require('cloudinary').v2;

app.use(bodyParser.json());

// Set CORS headers
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.get('/api/pictures/*', (req, res) => {
  cloudinary.search
    .expression('folder:Wedding')
    .sort_by('public_id','desc')
    .next_cursor(req.params[0])
    .max_results(12)
    .execute()

    .then(result => res.json(result))
    .catch(e => console.error('Error getting resource from cloudinary :: ', e));
});

app.listen(PORT, () => console.log(`Server up and running on port: ${PORT} @ ${new Date()}`));
