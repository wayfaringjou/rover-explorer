# 'Mars Rover Explorer'

## [Live App](https://rover-explorer.vercel.app/)

## Description

'Mars Rover Explorer' Let's you explore Mars' terrain through the lenses of the Rovers living in the Red Planet.

## Further goals for this project

There are still a few kinks a have to fix. I would like to incorporate a user account to offer further functionality like saving favorites. I would also like to spend more time on the CSS.

## Screenshots

- Search Panel

![Search Panel](./docs/screens/search-panel.png)

- Photo set

![Photo Set](./docs/screens/photo-page.png)

- Browse Photos

![Photos](./docs/screens/photos.png)

- View photos in detail

![Photo Detail](./docs/screens/viewer.png)

## Summary

Photos are displayed when a search is submitted. Each query requires a rover and a date. It can be further customized by selecting one of the available cameras from a certain date. Dates can be selected by sol (mission day) or earth's date. When browsing the photos, they will load in 25 increments while scrolling.

## Built with

This project was made with React, Javascript, HTML and CSS.

## Enviroment Variables Needed to run/deploy
Add a '.env' file with the following valiables:

- REACT_APP_API_BASEPATH: *Base path of api part of the app (e.g. https://sleepy-taiga-08469.herokuapp.com/api)*

## Running locally
To run to locally, clone this repo and the [API's repo](https://github.com/wayfaringjou/rover-explorer-api). Make sure to be running the server part of the app and to install required packages with `npm install`. After that run `npm start` to run or `npm build` to build. 

---

# API INFO

## Server side repo:

## [Rover-explorer-api](https://github.com/wayfaringjou/rover-explorer-api)

## [live-version](https://sleepy-taiga-08469.herokuapp.com/api)

## API documentation

### Resources in the REST API

#### Rovers

- Information about each rover.

#### Photos

- Photos taken by rover by earth date or sol.

#### Manifests

- Data about each rover's photo collection.

### Endpoints available

#### /rovers/{rover-name}

##### Actions

- `GET /rovers/{rover-name}`

  - Response:
    - Information about the rover including status, photos taken and cameras available.

#### /rovers/{rover-name}/photos

##### Actions

- `GET /rovers/{rover-name}/photos`

  - Response:

    - Set of photos for given parameters.

  - Parameters

    | name       |  type   | description                                                                                                     |
    | :--------- | :-----: | :-------------------------------------------------------------------------------------------------------------- |
    | sol        | integer | (Required, either this or earth_date) ranges from 0 to max found in endpoint                                    |
    | earth_date | string  | (Required, either this or sol) Format YYYY-MM-DD                                                                |
    | camera     | string  | If rover doesn't have a camera it returns an error. Check rovers info at /rovers/{rover-name} for it's cameras. |
    | page       | integer | 25 per page returned                                                                                            |

#### /rovers/{rover-name}/manifest

##### Actions

- `GET /rovers/{rover-name}/manifest`

  - Response:

    - A lot of data about photos for each mission day.

## Server Built with

This project was made with Express
