# NODE-EXPRESS-EJS-MOVIE-FAN-SITE

**NODE-EXPRESS-EJS-MOVIE-FAN-SITE** is a movie fan site built with **Express** and **EJS**, integrated with the **TMDb API**. The site uses **Passport.js** with the **passport-github** strategy for user authentication. Users can load movies, get movie details, and search for movies by title or actor's name.

## Installation

1. **Clone the repository:**  

   ```bash
   git clone https://github.com/bohdanadev/node-express-ejs-movieFanSite.git

   cd node-express-ejs-movieFanSite
   ```
2. Install dependencies:  

   ```bash
   npm install
   ```
3. Create config.js file in the root directory and set up GitHub ClientID and CLientSecret for your application  

   ```config.js  

    module.exports = {
    clientID: 
    clientSecret: 
    callbackURL: "http://localhost:3000/auth"}  

    ```

4. Create .env file in the root directory of the project and fill it with the following environment variables:

   ```.env
   PORT=3000  
   MDB_API_KEY=1fb720b97cc13e580c2c35e1138f90f8  
   MDB_API_BASE_URL=http://api.themoviedb.org/3  
   IMAGE_BASE_URL=http://image.tmdb.org/t/p/w300  
   API_BASE_URL=http://localhost:3030  
   API_KEY=123456789  
   ```

5. Start the server:  

   ```bash
   nodemon
   ```

## Usage  

Once the server is running, you can access the site at http://localhost:3000.

## User Authentication  

This site uses Passport.js with the passport-github strategy for user authentication. Users can log in using their GitHub accounts.