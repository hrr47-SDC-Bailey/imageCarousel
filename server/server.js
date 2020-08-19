const express = require('express');
const path = require('path');
const models = require('./models/index.js');
const cors = require('cors');
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/hostels/:hostel_id', express.static(path.join(__dirname, '../public')));

app.get('/api/hostels/:hostel_id/images', (req, res) => {
  // invoke images model method "fetchAllByHostel"
  // const params = url.parse(req.url, true).query;
  // console.log(req.params.hostel_id);
  models.image.fetchAllByHostelId(req.params.hostel_id, (error, images) => {
    // console.log('error: ', error, 'images', images);

    if (error) {
      res.status(502).send();
      return;
    }
    res.send(images);
  });
});

module.exports = app;
