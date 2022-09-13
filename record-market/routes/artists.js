const router = require("express").Router();
const { default: axios } = require("axios");
const consumerKey = process.env.CONSUMER_KEY
const secretKey = process.env.SECRET_KEY
var Discogs = require('disconnect').Client;
const passport = require('passport')
const User = require('../models/User.model')

var dis = new Discogs({
	consumerKey: consumerKey, 
	consumerSecret: secretKey
});

var db = dis.database();

router.get("/artists", (req, res, next) => {
  let arr = []
      //console.log(req.query.q)
  axios.get(`https://api.discogs.com/database/search?type=artist&q=${req.query.q}&key=${consumerKey}&secret=${secretKey}`)
    .then(response => {
        //console.log(response.data.results)  
        response.data.results.forEach((artist) => {
            if (artist.thumb.length !== 0) {
            arr.push(artist)
          }
          })
        //console.log(arr)
        res.render('./artistsAlbumsTracks/artists', {data: arr, auth: req.isAuthenticated()}) 
    })
    .catch(err => console.log(err))
    
    });

router.get('/artist/:id', (req,res,next) => {
  let albumArr = []

  db.getArtistReleases(req.params.id, {page: 1, per_page: 100}, function(err, data){
      console.log(data.pagination.pages)
      data.releases.forEach(album => {
        if (album.type === 'master' && album.thumb !== '' && album.role === 'Main'){
          albumArr.push(album)
        }
      })

  db.getArtist(req.params.id, function(err, datas){
    //console.log(albumArr)  
    res.render('./artistsAlbumsTracks/artistAlbums', {albums: albumArr, artist: datas, auth: req.isAuthenticated()})
  })

  })
      
})
 
module.exports = router;