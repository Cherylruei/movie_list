// include express in project
const express = require('express')
const app = express()
// define related variables 
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

// handle request and response here
app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results });
})

// show page
app.get('/movies/:movie_id', (req, res) => {
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id)
  res.render('show', { movie: movie });
})

// search keyword
app.get('/search', (req, res) => {
  // console.log('req.query.keyword', req.query.keyword)
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movie => {
    return movie.title.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { movies: movies, keyword: keyword });
})


// start listen when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})