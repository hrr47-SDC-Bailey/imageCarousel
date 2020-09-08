const { Pool, Client } = require('pg');

module.exports.pool = new Pool({
  user: 'images',
  host: '3.134.238.211',
  //host: 'localhost',
  database: 'image_carousel',
  max: 1000,
  idleTimeoutMillis: 2000,
  maxUses: 1000,
});

module.exports.client = new Client({
  user: 'images',
  host: '3.134.238.211',
  //host: 'localhost',
  database: 'image_carousel',
});
