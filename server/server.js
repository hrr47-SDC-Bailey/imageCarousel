require('newrelic');
const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const models = require('./models/index.js');

const port_redis = 6379;
const redis_client = redis.createClient(port_redis);
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

const checkCache = (req, res, next) => {
  const { hostel_id } = req.params;

  redis_client.get(hostel_id, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    //if no match found
    if (data != null) {
      res.send(JSON.parse(data));
    } else {
      //proceed to next middleware function
      next();
    }
  });
};

app.get('/loaderio-bb4a4cbb3572b5cb6fd1eef99c0e7ff4/', (req, res) => {
  res.send('loaderio-bb4a4cbb3572b5cb6fd1eef99c0e7ff4');
});

app.get('/api/hostels/:hostel_id/images', checkCache, (req, res) => {
  const { hostel_id } = req.params;
  console.log(hostel_id);
  models.image.fetchAllByHostelId(hostel_id, (error, images) => {
    if (error) {
      res.send(error);
      return;
    }
    redis_client.setex(hostel_id, 3600, JSON.stringify(images));
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
