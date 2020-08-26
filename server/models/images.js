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
  const fileName = newImage.fileName;
  const url = newImage.url;
  const description = newImage.description;
  const hostelId = newImage.hostelId;
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

module.exports.deleteEntry = (id, callback) => {
  // const queryStr = 'SELECT * FROM `images` WHERE hostel_id = ?';
  // const queryArgs = [id];
  const queryStr = 'DELETE FROM `images` WHERE `id` = ?';
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
  // const queryStr = 'SELECT * FROM `images` WHERE hostel_id = ?';
  // const queryArgs = [id];
  const queryStr = 'UPDATE `images` SET `file_name` = ?, `url` = ?, `description` = ?, `hostel_id` = ? WHERE `id` = ?';
  const queryArgs = [imageToUpdate.fileName, imageToUpdate.url, imageToUpdate.description, imageToUpdate.hostelId, imageToUpdate.id];

  db.query(queryStr, queryArgs, (error, results) => {
    if (error || results.length === 0) {
      callback('error', null);
      return;
    }
    callback(null, results);
  });
};