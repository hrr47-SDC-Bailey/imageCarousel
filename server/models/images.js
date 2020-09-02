const db = require('../database/index.js');

module.exports.fetchAllByHostelId = (id, callback) => {
  const queryStr = 'SELECT * FROM images WHERE hostel_id = $1';
  const queryArgs = [id];

  db.query(queryStr, queryArgs, (error, results) => {
    if (error || results.length === 0) {
      callback(error.stack, null);
      return;
    }
    callback(null, results.rows);
  });
};

module.exports.createNewEntry = (newImage, callback) => {
  const url = newImage.url;
  const hostelId = newImage.hostel_id;
  const queryStr = 'INSERT INTO images (hostel_id, url) VALUES ($1, $2)';
  const queryArgs = [hostelId, url];

  db.query(queryStr, queryArgs, (error, results) => {
    if (error || results.length === 0) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
};

module.exports.deleteEntry = (id, callback) => {
  const queryStr = 'DELETE FROM images WHERE id = $1';
  const queryArgs = [id];

  db.query(queryStr, queryArgs, (error, results) => {
    if (error || results.length === 0) {
      callback('error', null);
      return;
    }
    callback(null, results);
  });
};

module.exports.updateEntry = (imageToUpdate, callback) => {
  const queryStr = 'UPDATE images SET hostel_id = $1, url = $2 WHERE id = $3';
  const queryArgs = [imageToUpdate.hostel_id, imageToUpdate.url, imageToUpdate.id];

  db.query(queryStr, queryArgs, (error, results) => {
    if (error || results.length === 0) {
      callback('error', null);
      return;
    }
    callback(null, results);
  });
};