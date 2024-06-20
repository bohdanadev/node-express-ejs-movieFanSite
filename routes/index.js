var express = require('express');
var router = express.Router();
const axios = require('axios');
const passport = require('passport');
var dotenv = require('dotenv');
dotenv.config();


const apiKey = process.env.MDB_API_KEY;
//const apiKey = process.env.API_KEY;
const apiBaseUrl = process.env.MDB_API_BASE_URL;
//const apiBaseUrl = process.env.API_BASE_UR;
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = process.env.IMAGE_BASE_URL;

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});

router.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data: http://image.tmdb.org http://*.tmdb.org; style-src 'self' 'unsafe-inline' https://maxcdn.bootstrapcdn.com https://fonts.googleapis.com; style-src-elem 'self' 'unsafe-inline' https://maxcdn.bootstrapcdn.com https://fonts.googleapis.com; script-src 'self' https://ajax.googleapis.com https://maxcdn.bootstrapcdn.com; script-src-elem 'self' https://ajax.googleapis.com https://maxcdn.bootstrapcdn.com; font-src 'self' https://fonts.gstatic.com https://maxcdn.bootstrapcdn.com"

  );
  next();
});

/* GET home page. */
router.get('/', async function(req, res, next) {
 try {
  const movieData = await axios.get(nowPlayingUrl).then(value => value.data);
  res.render('index', {movieData: movieData.results});
 } catch (e) {
  console.log(e);
 }
});

router.get('/login',passport.authenticate('github'));

router.get('/favorites',(req, res)=>{
  res.json(req.user.displayName)
});

router.get('/auth',passport.authenticate('github',{
  successRedirect: '/',
  failureRedirect: '/loginFailed'
}));

router.get('/movie/:id', async function(req, res, next) {
  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`
  await axios.get(thisMovieUrl).then((value) => res.render('single-movie', {singleMovie: value.data}))
});

router.post('/search', async (req, res, next)=>{
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`
  const movieData = await axios.get(movieUrl).then(value => value.data);
  res.render('index', {
    movieData: cat==='person' ? movieData.results[0].known_for : movieData.results
  });
});

module.exports = router;
