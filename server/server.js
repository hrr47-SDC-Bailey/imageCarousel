require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const models = require('./models/index.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/hostels/:hostel_id', express.static(path.join(__dirname, '../public')));

app.get('/loaderio-bb4a4cbb3572b5cb6fd1eef99c0e7ff4/', (req, res) => {
  res.send('loaderio-bb4a4cbb3572b5cb6fd1eef99c0e7ff4');
});

app.get('/api/hostels/:hostel_id/images', (req, res) => {
  models.image.fetchAllByHostelId(req.params.hostel_id, (error, images) => {
    if (error) {
      res.send(error);
      return;
    }
    res.send(images);
  });
});

app.post('/api/hostels/:hostel_id/images', (req, res) => {
  console.log(req.body);
  models.image.createNewEntry(req.body, (error, newImage) => {
    if (error) {
      // res.status(502).send();
      res.send(error);
      return;
    }
    res.send(newImage);
  });
});

app.delete('/api/hostels/:hostel_id/images', (req, res) => {
  console.log(req.body);
  models.image.deleteEntry(req.body.id, (error, deletedImage) => {
    if (error) {
      res.status(502).send();
      return;
    }
    res.send(deletedImage);
  });
});

app.put('/api/hostels/:hostel_id/images', (req, res) => {
  console.log(req.body);
  models.image.updateEntry(req.body, (error, updatedImage) => {
    if (error) {
      res.status(502).send();
      return;
    }
    res.send(updatedImage);
  });
});

module.exports = app;
