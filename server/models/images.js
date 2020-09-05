const db = require('../database/index.js');

module.exports.fetchAllByHostelId = (id, callback) => {
  const queryStr = `select hostel_id, concat('https://sdc-bailey-imagecarousel.s3.us-east-2.amazonaws.com/',url,'.jpg') "url" FROM images WHERE hostel_id = $1`;
  const queryArgs = [id];
  db.pool.connect((err, client, done) => {
    if (err) {
      return console.error('error acquiring client', err.stack);
    }
    client.query(queryStr, queryArgs, (error, results) => {
      done();
      if (error || results.length === 0) {
        callback(error.stack, null);
        console.log(error.stack);
        return;
      }
      callback(null, results.rows);
    });
  });
};

module.exports.createNewEntry = (newImage, callback) => {
  const url = newImage.url;
  const hostelId = newImage.hostel_id;
  const queryStr = 'INSERT INTO images (hostel_id, url) VALUES ($1, $2)';
  const queryArgs = [hostelId, url];

  db.pool.connect((err, client, done) => {
    if (err) {
      return console.error('error acquiring client', err.stack);
    }
    client.query(queryStr, queryArgs, (error, results) => {
      done();
      if (error || results.length === 0) {
        callback(error.stack, null);
        console.log(error.stack);
        return;
      }
      callback(null, results.rows);
    });
  });
};

module.exports.deleteEntry = (id, callback) => {
  const queryStr = 'DELETE FROM images WHERE id = $1';
  const queryArgs = [id];
  db.pool.connect((err, client, done) => {
    if (err) {
      return console.error('error acquiring client', err.stack);
    }
    client.query(queryStr, queryArgs, (error, results) => {
      done();
      if (error || results.length === 0) {
        callback(error.stack, null);
        console.log(error.stack);
        return;
      }
      callback(null, results.rows);
    });
  });
};

module.exports.updateEntry = (imageToUpdate, callback) => {
  const queryStr = 'UPDATE images SET hostel_id = $1, url = $2 WHERE id = $3';
  const queryArgs = [imageToUpdate.hostel_id, imageToUpdate.url, imageToUpdate.id];

  db.pool.connect((err, client, done) => {
    if (err) {
      return console.error('error acquiring client', err.stack);
    }
    client.query(queryStr, queryArgs, (error, results) => {
      done();
      if (error || results.length === 0) {
        callback(error.stack, null);
        console.log(error.stack);
        return;
      }
      callback(null, results.rows);
    });
  });
};
