const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  // user: 'traveler',
  // password: 'travel',
  user: 'root',
  password: 'mypass',
  database: 'image_carousel',
});

connection.connect();

module.exports = connection;
