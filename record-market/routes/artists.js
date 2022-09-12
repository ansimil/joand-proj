const router = require("express").Router();
const { default: axios } = require("axios");
const consumerKey = process.env.CONSUMER_KEY
const secretKey = process.env.SECRET_KEY
var Discogs = require('disconnect').Client;

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
        res.render('artists', {data: arr}) 
        //res.redirect('/')
    })
    .catch(err => console.log(err))
    
    });

router.get('/artist/:name/:id', (req,res,next) => {
  let albumArr = []
  db.getArtistReleases(req.params.id, {page: 1, per_page: 1000}, function(err, data){
        data.releases.forEach(album => {
          if (album.type === 'master' && album.thumb !== ''){
            albumArr.push(album)
          }
        })
        db.getArtist(req.params.id, function(err, data2){
          //console.log(data2)  
          res.render('artistAlbums', {albums: albumArr, artist: data2})
        })
        
      })
    
  }) 
  // let albumArr = []
  // axios.get(`https://api.discogs.com/artists/${req.params.id}/releases`)
  // .then (response => {
  //   //console.log(response.data)
  //   response.data.releases.forEach(album => {
  //     if (album.type === 'release'){
  //       albumArr.push(album)
  //     }
  //   })
  //   //console.log(albumArr)
  // axios.get(`https://api.discogs.com/artists/${req.params.id}`)
  // .then(response => {
  // //console.log(albumArr)
  // res.render('artistAlbums', {albums: albumArr, artist: response.data})
  // })
  // .catch(err => console.log(err)) 
  // })
  // .catch(err => console.log(err))
 



module.exports = router;