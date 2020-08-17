require('dotenv').config();
const ENV = process.env.NODE_ENV || 'dev';
const PORT = process.env.PORT || 3030;

module.exports = { PORT, ENV };
