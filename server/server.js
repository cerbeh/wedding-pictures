const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./router');

const create = config => {

  app.use(bodyParser.json());

  // Set CORS headers
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

  app.set('port', config.PORT);
  app.set('env', config.ENV);

  router.init(app);
};

const start = () => {
  const PORT = app.get('port');
  app.listen(PORT, () => console.log(`Server up and running on port: ${PORT} @ ${new Date()}`));
};

module.exports = { create, start };
