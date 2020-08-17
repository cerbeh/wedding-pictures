const fs = require('fs');
const path = require('path');
const express = require('express');

const createRoutes = () => {
  const router = express.Router();
  const appDirectory = path.join(__dirname, '../apps');
  fs
    .readdirSync(appDirectory)
    .map(appName => {
      const routePath = path.join('../apps', appName, 'routes.js');
      router.use(`/${appName}`, require(routePath));
      return;
    });

  return router;
};

const init = server => {

  server.get('*', function (req, res, next) {
    console.log('Request was made to: ' + req.originalUrl);
    return next();
  });

  const appRoutes = createRoutes();
  server.use('/api', appRoutes);
};

module.exports = { init };
