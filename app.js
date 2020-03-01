require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.port || 3030;

const cloudinary = require('cloudinary').v2;

app.use(bodyParser.json());

app.get('/pictures', (req, res) => {
  cloudinary.search
    .expression('folder:Wedding')
    .sort_by('public_id','desc')
    .next_cursor(req.body.next_cursor)
    .max_results(30)
    .execute()

    .then(result => res.json(result))
    .catch(e => console.error('Error getting resource from cloudinary ::', e));
});

app.listen(PORT, () => console.log(`Server up and running on port: ${PORT}`));
