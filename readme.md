# Lexa

[![Node|React|Apollo|MongoDB|Express](https://i.imgur.com/EaBcbef.jpg)]()

[Lexa live](https://lexa.netlify.app/)

Lexa is an E-Commerce based C2C web application built using nodejs and reactjs

- BE - ExpressJS, GraphQL
- FE - React-Redux, Apollo
- Storage and deployement - [GCP](https://lexa-api.uc.r.appspot.com/graphql), [EC2](http://ec2-13-233-48-194.ap-south-1.compute.amazonaws.com:4000/)

# New features

- This application doesn't make unnecessary api calls. The application catches the most re-occuring requests and serves the re-occured requests from store , without making a new api call! .To reduce the load balance of store the application uses queue system to store the data - by popping out old ones, when the set limit reaches .
- For the user authentication - the application makes use of ES6 generators(redux-saga) to handle the validation process by not requesting api for simple auth checks !.
- The application is designed with non - fatty action-creators , all the actions that are dispatched throughout the application are just plain object with no async logic inside them(which makes the action triggering delayed)!.
- The application is also fully-responsive , the styles for the application are manually coded with the help of sass. The app has different designs for - phones, iPad and desktops.

And also:

- The api is available in both graphQL and REST version.
- The api is documented with postman App
- The api documention can be accessed via this repo under [docs](https://github.com/praveenNagaraj97-au7/Lexa/tree/master/Docs/API) section where each endpoint is explained with examaple I/O which helps in building frontend.

  - [✔] collection https://www.getpostman.com/collections/36831846ccaff2ca5659.

  > The GraphQL version of the application is deployed on EC2 with nginx proxy .
  > The Restful version is deployed on google app engine and heroku.

### Tech

This application uses a number of open source projects /packages to work properly:

- [ReactJS] - JS library to build interactive elements on website!
- [Redux] - To maintain state of application.
- [Apollo] - For graphql implementation
- [Redux-saga] - To handle async data fetching, access browser cache and side effects.
- [React-Query] - New hook to handle data fetching for protected routes (replica of gql-query)
- [Redux-persist] - To maintain state of application even after refresh(Note: the state is encrypted even though user data is not persisted).
- [Redux-form] - To handle forms data.
- [Node js] - evented I/O for the backend
- [Express Js] - fast node.js network app framework
- [GCP] - To store data objects / files.
- [MongoDB] - To store data of the application.
- [Axios] - To handle fetching XHR and HTTP requests.
- [Babel] - to compile es6 to es5.
- [SendGrid] - for mailing service.
- [JWT] for secured auth tokens.
- [Stripe] for Payment gateway


### Design

#### Frontend(netlify)

- The application is designed in a way to achieve better user experience with less api calls.
- If the required data is already available on the client side, instead of making new api request for data,the app modifies the existing data, which is way faster than getting new data and processing it.
- The application uses redux-saga to handle the side-effects.
- The application uses queue algorithm to store the reoccuring requests and to decide user-liking products.
- Distance algorithm/Levenshtein distance is used to find the similar products that are 50% similar to one other.
- The app also supports redirects/refresh.
- The actions that are being dispatched are named with the place/file they are being dispatched.
- The application has a single source of error handle(global error handler) which is handled using redux-saga.
- Redux-form is used for handling forms data.
- Help Page and some buttons are designed using material-Ui and other part of the app uses custom styles.
- The Apollo client is configured with subscription (which can also be used instead of redux)(apollo-gql version soon!).
- The actions in the application are pure objects with logics/async calls inside them.
  - The actions describes - what happened ,where it happened.
- Even the reducer contains the very simple logic
- All the logics are handled using selectors, sagas and even simple utility functions/classes.
- The store is persited with redux-persistance.
- All the Detail Page and review page are unique.
- The application is designed with keeping space for future upgrades.

##### Payment Gateway

- Lexa uses Stripe Payment api to handle payment options.
- Reason for using stripe is there excellent documentation😍.
- The application uses payment intent method to handle checkouts /instead of redirects.

#### Backend

- MongoDB is used as database server for the application.
- API follows single handler for CRUD operations/Factory concept and MVC pattern.
- API is written in ES6 syntax.
- File/Image Processing class is written to handle Image and Video uploads.
- Google Storage service is used for Uploads.
- Different Categories of images/files are stored in it's own folder/bucket.
  -Ex :- Product Cover images are stored in product-cover bucket ,where as differnt categories of review images are stored in it's own bucket.
- Most of the document based logics are handled in mongodb document middleware.
- The Api provides different set of data for differnt product category.
- The Backend server makes used mongoDB discriminator to store differnt set of data for the same model.


### Installation

Lexa requires [Node.js](https://nodejs.org/) v10+ and [google api credentials](https://console.cloud.google.com/) to run.

Install the dependencies and devDependencies and start the server.

```sh
$ yarn
$ yarn start-dev
```

For production environments...

```sh
$ yarn build
$ yarn start
```

### Todos

- Write Tests
- Add Light Mode

###### Improvements

- Order quantity is restricted to one per customer(for same product)- differnt products with 1 quantity can be grouped.
- As mongodb doesn't supports multiple data querying which is needed to modify the ordered quantity / Transcations can be moved sql.

## License

MIT

**Free Software, Hell Yeah!**
