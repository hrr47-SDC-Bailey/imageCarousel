const faker = require('faker');

const hostelize = (element) => {
  const hostelName = `${faker.hacker.adjective()} ${faker.hacker.noun()} Hostel`;
  const hostelAddress = `${faker.address.streetAddress()} ${faker.address.streetName()} ${faker.address.streetSuffix()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.countryCode()}`;
  element = {
    name: hostelName,
    address: hostelAddress,
  };
  // console.log('about to promise');
  // console.log(element);
  return Promise.resolve(element);
  return new Promise(function(resolve, reject) {

  })
};

const asyncFunc = async (value) => {return hostelize(value);};

const generateData = async () => {
  return Promise.all([...Array(200)].map((el) => {
    return asyncFunc(el);
  }));
}

// const generateData = async () => {
//   let set = new Set([...Array(15)]);
//   return Promise.all(set.forEach(asyncFunc));
// }
  // for (let i = 0; i < 1000000; i++) {
  //   const hostel = {};
  //   hostel.address = hostelAddress;
  //   output.push(hostel);
  // }
for (var i = 0; i < 60000; i++) {
  console.log(i);
  generateData();
    // .then((data) => {
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
}
console.log('done');
