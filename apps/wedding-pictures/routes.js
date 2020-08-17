const router = require('express').Router();

const cloudinary = require('cloudinary').v2;

router.get('/pictures*', (req, res) => {
  cloudinary.search
    .expression('folder:Wedding')
    .sort_by('public_id','desc')
    .next_cursor(req.params[0].replace('/', ''))
    .max_results(12)
    .execute()

    .then(result => res.json(result))
    .catch(e => console.error('Error getting resource from cloudinary :: ', e));
});

module.exports = router;
