const db = require('../database/index.js');

module.exports.fetchAllByHostelId = (id, callback) => {
  const queryStr = 'SELECT * FROM `images` WHERE hostel_id = ?';
  const queryArgs = [id];

  db.query(queryStr, queryArgs, (error, results) => {
    if (error || results.length === 0) {
      callback('error', null);
      return;
    }
    callback(null, results);
  });
};

module.exports.createNewEntry = (newImage, callback) => {
  // const queryStr = 'SELECT * FROM `images` WHERE hostel_id = ?';
  // const queryArgs = [id];
  const fileName = newImage.filename;
  const url = newImage.url;
  const description = newImage.description;
  const hostelId = newImage.hostelID;
  const queryStr = 'INSERT INTO `images` (file_name, url, description, hostel_id) VALUES (?, ?, ?, ?)';
  const queryArgs = [fileName, url, description, hostelId];

  db.query(queryStr, queryArgs, (error, results) => {
    if (error || results.length === 0) {
      callback('error', null);
      return;
    }
    callback(null, results);
  });
};
