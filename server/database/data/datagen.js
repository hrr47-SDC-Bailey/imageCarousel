const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'cassandra.csv',
  header: [
    // { id: 'imageId', title: 'IMAGEID' },
    { id: 'hostelId', title: 'HOSTELID' },
    // { id: 'hostelName', title: 'HOSTELNAME' },
    // { id: 'hostelAddress', title: 'HOSTELADDRESS' },
    { id: 'url', title: 'URL' },
  ],
});

let recordCount = 0;
let imageId = 1;
const desiredRecords = 10000000;
const storedImageCount = 1000;
//used to be 648, need to add more images

const generateImages = (hostelId) => {
  let imageCount = 15;
  const images = [];
  // const hostelName = `${faker.hacker.adjective()} ${faker.hacker.noun()} Hostel`;
  // const hostelAddress = `${faker.address.streetAddress()} ${faker.address.streetName()} ${faker.address.streetSuffix()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.countryCode()}`;
  while (imageCount > 0) {
    const fileNumber = Math.floor(Math.random() * storedImageCount) + 1;
    const url = `https://sdc-bailey-imagecarousel.s3.us-east-2.amazonaws.com/${fileNumber}.jpg`;
    // console.log(imageId);
    images.push({
      // imageId,
      hostelId,
      url,
    });
    imageCount -= 1;
    imageId += 1;
  }
  return images;
};

const generateHostels = async () => {
  while (recordCount < desiredRecords) {
    /* eslint-disable no-await-in-loop */
    try {
      recordCount += 1;
      // console.log(recordCount);
      const hostelImages = await generateImages(recordCount);
      await csvWriter.writeRecords(hostelImages);
    } catch (err) {
      console.log(err);
      process.exit();
    }
    await generateHostels();
  }
};

const generateData = async () => {
  try {
    const startTime = new Date();
    await generateHostels();
    const endTime = new Date();
    console.log(`started generation at ${startTime}`);
    console.log(`finished generation at ${endTime}`);
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

generateData();

// const hostelize = (element) => {
//   const hostelName = `${faker.hacker.adjective()} ${faker.hacker.noun()} Hostel`;
//   const hostelAddress = `${faker.address.streetAddress()} ${faker.address.streetName()} ${faker.address.streetSuffix()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.countryCode()}`;
//   element = {
//     name: hostelName,
//     address: hostelAddress,
//   };
//   return Promise.resolve(element);
// };

// const asyncFunc = async (value) => {return hostelize(value);};

// const generateData = async () => {
//   return Promise.all([...Array(10)].map((el) => {
//     return asyncFunc(el);
//   }));
// }

// for (var i = 0; i < 100; i++) {
//   console.log(i);
//   generateData();
// }
// console.log('done');
