const faker = require('faker');

const db = require('./index.js');

faker.locale = 'en_US';
// counter used to generate unique numbers for the file names in my image table
// it is used because there will be many unique image entries that will share the same actual image
let nextImageId = 1;

function generateImages(hostelId) {
  // generate random number from 1 to 30 to set as number of images included for current hostel
  const imageCount = Math.floor(Math.random() * (30 - 1) + 1);
  // make an array to hold a set of random indexes equal to the imageCount
  const randomS3Indexes = [];

  // run a while loop to generate new random indexes and only push to
  // randomS3Indexes if they are unique
  while (randomS3Indexes.length < imageCount) {
    const randomS3Index = Math.floor(Math.random() * (50 - 1) + 1);
    if (randomS3Indexes.indexOf(randomS3Index) === -1) {
      randomS3Indexes.push(randomS3Index);
    }
  }

  // iterate over range of imageCount to produce that number of unique images
  // to insert into images table
  for (let i = 1; i < imageCount + 1; i += 1) {
    const fileName = `img_${nextImageId}.jpg`;
    const url = `https://hostileworldimages.s3.us-east-2.amazonaws.com/img_${randomS3Indexes[i - 1]}.jpg`;
    const description = faker.hacker.phrase();
    // if no errors, increment nextImageId;
    nextImageId += 1;

    // prepare query string and query args for insert
    const queryStr = 'INSERT INTO `images` (file_name, url, description, hostel_id) VALUES (?, ?, ?, ?)';
    const queryArgs = [fileName, url, description, hostelId];

    // check if we are at final image of final hostel
    // if so, close our database connection after work is done
    if (hostelId === 100 && i === imageCount) {
      db.query(queryStr, queryArgs, (error) => {
        if (error) {
          throw error;
          // throw new Error('Error occured while seeding images');
        }
        db.end();
      });
    } else {
      db.query(queryStr, queryArgs, (error) => {
        if (error) {
          throw error;
          // throw new Error('Error occured while seeding images');
        }
      });
    }
  }
}

for (let i = 1; i < 101; i += 1) {
  // generate a random name and address for the current hostel
  const hostelName = `${faker.hacker.adjective()} ${faker.hacker.noun()} Hostel`;
  const hostelAddress = `${faker.address.streetAddress()} ${faker.address.streetName()} ${faker.address.streetSuffix()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.countryCode()}`;

  // prepare the query strings and query args for inserting
  const queryStr = 'INSERT INTO `hostels` (name, address) VALUES (?, ?)';
  const queryArgs = [hostelName, hostelAddress];

  // insert new row into hostels table
  db.query(queryStr, queryArgs, (error) => {
    if (error) {
      throw error;
      // throw new Error('Error occured seeding hostels');
    }
  });

  // make a call to generateImages in order to create a set of 1 - 30 images that will
  // have the current hostel's index as their foreign key
  generateImages(i);
}
