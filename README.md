# Wandrr Image Carousel Service

> The image carousel component for Wandrr app.

## Related Projects

  - https://github.com/hrr47-karev/property-info-service
  - https://github.com/hrr47-karev/Availability-Component
  - https://github.com/hrr47-karev/Reviews-Service
  - https://github.com/hrr47-karev/imageCarouselProxy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Image carousel component needs to mount to two separate divs on the root html page. The first div should have the ID 'images-header' and the second div should have the ID 'image-grid'. There will be another div in-between these two to host the 'infoservice' component, but that is outside the scope of this service.

Also, the React.ref used to scroll the page down to the availability section upon clicking 'Check Prices' will look for a div outside the scope of this service with the ID 'Availability'. Make sure to communicate with team members to ensure that the Availability-Component is mounted to a div with the ID of 'Availability' for this feature to work.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

Running webpack w/ Babel:

```
npm run react-dev
```

Running server in development (w/ Nodemon)

```
npm run server-dev
```

Running server in production

```
npm start
```

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### API

GET
  Expected Inputs:
  1) hostel_id

POST
  Expected Inputs:
  1) file_name
  2) url
  3) description
  4) hostel_id

PUT
  Expected Inputs:
  1) file_name
  2) url
  3) description
  4) hostel_id
  5) id

DELETE
  Expected Inputs:
  1) id (image id)