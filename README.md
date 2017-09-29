This project is entended to practice and showcase the technologies of the MERN stack.  I decided to integrate with the public Marvel API to provide all data; mainly because it's a free, easy-to-use and fairly stable API. 

Although this is one repository, it holds two separate projects (frontend client and backend API).  While I did this for ease-of-development and simplicity, the two projects can be run completely separately.

## Technologies

**M**ongoDB: database to hold the user's favorite heroes and comics.
[MongoDB website](https://www.mongodb.com/ "Official MongoDB website")

**E**xpress: framework used to organize the backend API code.
[Express website](https://expressjs.com/ "Official Express Website")

**R**eact: framework used to organize the client frontend code.
[React website](https://reactjs.org/ "Official React Website")

**N**ode: javascript runtime driving the backend API.
[Node website](https://nodejs.org/en/ "Official Node Website")

## Installation & Setup

1. The project expects a few environment variables to be set, which can be set using a .env file.  The .env file itself is not checked into the repository, only it's .env.template version.  Make a copy of this file and rename it to .env.  Each environment variable setting in this file is discussed below.
   
   ```
   Copy /api/.env.template to /api/.env
   ```
1. A running instance of MongoDB is expected.  Two settings need to be made in the .env file, which will contain the connection endpoints for the development and test databases:
   
   ```
   MONGODB_DEVELOPMENT
   MONGODB_TEST
   ```
1. The `HOST` environment variable should contain the host that will be used to connect to the application in a browser, minus the protocol and port.  Example: dev.marvel-searcher.com.
1. An active Marvel Developer account must be maintained.  This is a free account that is easily created at the developer.marvel.com site.  The following Marvel related information needs to be set in the following environment variables:

   ```
   MARVEL_API_KEY - Key provided by developer.marvel.com after creating your account.
   MARVEL_ENDPOINT - Public endpoint where the marvel api exists.  At time of writing this: https://gateway.marvel.com:443/v1/public
   ```
1. Install dependencies for the API.  Run this in a terminal:

   ```
   cd [APP_ROOT]/api && npm install
   ```
1. Install dependencies for the Client.  Run this in a terminal:

   ```
   cd [APP_ROOT]/client && npm install
   ```
1. To startup the API, run this in a terminal:

   ```
   cd [APP_ROOT]/api && npm start
   ```
   A message should be displayed in the terminal window looking something like this:
   
   ```
   Running API at http://dev.marvel-searcher.com:3001
   ```
1. To startup the Client, run this **in a separate terminal window**:

   ```
   cd [APP_ROOT]/client nmp install
   ```
   This should take you to your default browser and open a new tab running the application.
   
## Usage
Once the application is up and running, you can search for Marvel heroes and comics by typing in the provided search box on each respective page.  Selecting a provided suggestion will take you to a more detailed page about that entity.  All this data is retreived from the API application, which in turn is making calls out to the developer.marvel.com API.

You are also able to choose a specific entity as your favorites, which will save this in the MongoDB database.  Navigating to the Favorites page will display all your saved favorites.  Here you can go to each favorite's page, or remove favorites.

## Testing
Both the API and Client projects have tests written to support the code.

1. To test the API code, run this in a terminal:

   ```
   cd [APP_ROOT]/api && npm test
   ```
1. To test the Client code, run this in a terminal:

   ```
   cd [APP_ROOT]/client && npm test
   ```
   
