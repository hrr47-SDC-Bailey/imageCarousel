// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   // user: 'traveler',
//   // password: 'travel',
//   user: 'root',
//   password: 'mypass',
//   database: 'image_carousel',
// });

// connection.connect();

// module.exports = connection;

const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'images',
  host: 'localhost',
  database: 'image_carousel',
  // password: 'images',
  // port: 3007,
});

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   console.log(err);
//   pool.end();
// });

const client = new Client({
  user: 'images',
  host: 'localhost',
  database: 'image_carousel',
  // password: 'images',
  // port: 3007,
});

client.connect();
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res);
//   console.log('heres the error');
//   console.log(err);
//   client.end();
// });

module.exports = client;
