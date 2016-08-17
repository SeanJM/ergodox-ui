require('dotenv').config();

module.exports = process.env.NODE_TYPE === 'site';
