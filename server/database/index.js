const { Pool, Client } = require('pg');

module.exports.pool = new Pool({
  user: 'images',
  host: 'localhost',
  database: 'image_carousel',
  max: 250,
  idleTimeoutMillis: 2000,
  maxUses: 1000,
});

module.exports.client = new Client({
  user: 'images',
  host: 'localhost',
  database: 'image_carousel',
});
