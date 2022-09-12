const router = require("express").Router();
const { default: axios } = require("axios");
const consumerKey = process.env.CONSUMER_KEY
const secretKey = process.env.SECRET_KEY

router.get("/artists", (req, res, next) => {
  let arr = []
      console.log(req.query.q)
  axios.get(`https://api.discogs.com/database/search?type=artist&q=${req.query.q}&key=${consumerKey}&secret=${secretKey}`)
    .then(response => {
        //console.log(response.data.results)  
        response.data.results.forEach((artist) => {
            if (artist.thumb.length !== 0) {
            arr.push(artist)
          }
          })
        console.log(arr)
        res.render('artists', {data: arr}) 
        //res.redirect('/')
    })
    .catch(err => console.log(err))
    
    });

router.get('/artist/:name/:id', (req,res,next) => {
  let albumArr = []
  axios.get(`https://api.discogs.com/database/search?artist=${req.params.name}&format=album&key=xxngcrMgfixhjsPCBABk&secret=BHHlWipWQaZBkHAuJhBVAkxLOYZWgYlR`)
  .then (response => {
    //console.log(response.data)
    response.data.results.forEach(album => {
      if (album.type === 'master'){
        albumArr.push(album)
      }
    })
    //console.log(albumArr)
  axios.get(`https://api.discogs.com/artists/${req.params.id}`)
  .then(response => {
  console.log(response.data)
  res.render('artistAlbums', {albums: albumArr, artist: response.data})
  })
  .catch(err => console.log(err)) 
  })
  .catch(err => console.log(err))
}) 
module.exports = router;