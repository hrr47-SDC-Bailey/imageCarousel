// const faker = require('faker');
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// const csvWriter = createCsvWriter({
//   path: 'postgres.csv',
//   header: [
//     // { id: 'imageId', title: 'IMAGEID' },
//     { id: 'hostelId', title: 'HOSTELID' },
//     // { id: 'hostelName', title: 'HOSTELNAME' },
//     // { id: 'hostelAddress', title: 'HOSTELADDRESS' },
//     { id: 'url', title: 'URL' },
//   ],
// });

// let recordCount = 0;
// let imageId = 1;
// const desiredRecords = 1000;
// //start at 2000000;
// const storedImageCount = 1000;
// //used to be 648, need to add more images

// const generateImages = (hostelId) => {
//   let imageCount = 15;
//   const images = [];
//   // const hostelName = `${faker.hacker.adjective()} ${faker.hacker.noun()} Hostel`;
//   // const hostelAddress = `${faker.address.streetAddress()} ${faker.address.streetName()} ${faker.address.streetSuffix()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.countryCode()}`;
//   while (imageCount > 0) {
//     const fileNumber = Math.floor(Math.random() * storedImageCount) + 1;
//     const url = `https://sdc-bailey-imagecarousel.s3.us-east-2.amazonaws.com/${fileNumber}.jpg`;
//     images.push({
//       hostelId,
//       fileNumber,
//     });
//     imageCount -= 1;
//     imageId += 1;
//   }
//   return images;
// };

// const generateHostels = async () => {
//   while (recordCount < desiredRecords) {
//     /* eslint-disable no-await-in-loop */
//     try {
//       recordCount += 1;
//       // console.log(recordCount);
//       const hostelImages = await generateImages(recordCount);
//       await csvWriter.writeRecords(hostelImages);
//     } catch (err) {
//       console.log(err);
//       process.exit();
//     }
//     await generateHostels();
//   }
// };

// const generateData = async () => {
//   try {
//     const startTime = new Date();
//     await generateHostels();
//     const endTime = new Date();
//     console.log(`started generation at ${startTime}`);
//     console.log(`finished generation at ${endTime}`);
//   } catch (err) {
//     console.log(err);
//     process.exit();
//   }
// };

// generateData();

const faker = require('faker');
const fs = require('fs');

const stream = fs.createWriteStream('postgres.csv');

const createImages = (num) => {
  let images = ``;
  for (var i = 0; i < 15; i++) {
    const fileNumber = Math.floor(Math.random() * 1000) + 1;
    const hostel_id = num;
    const url = `https://sdc-bailey-imagecarousel.s3.us-east-2.amazonaws.com/${fileNumber}.jpg`;
    images += `${hostel_id},${fileNumber}\n`;
  }
  return images;
};

const startWriting = (writeStream, encoding, done) => {
  let i = 0;
  function writing() {
    const canWrite = true;
  //   while (i < 10000000 && canWrite) {
  //     i += 1;
  //     const listing = createOneImage(i);

  //     if (i === 0) {
  //       writeStream.write(listing, encoding, done);
  //     } else {
  //       writeStream.write(listing, encoding);
  //     }
  //   }

  //   if (i > 0 && !canWrite) {
  //     writeStream.once('drain', writing);
  //   }
  // }
    do {
      i++
      let images = createImages(i);
      if (i === 10000000) {
        writeStream.write(images, encoding, done)
      } else {
        writeStream.write(images, encoding)
      }
    } while (i < 10000000 && canWrite)

    if (i < 10000000 && !canWrite) {
      writeStream.once('drain', writing);
    }
  }
  writing();
};

stream.write('hostel_id, url\n', 'utf-8');
startWriting(stream, 'utf-8', () => {
  stream.end();
});
