const router = require("express").Router();
const { default: axios } = require("axios");
const consumerKey = process.env.CONSUMER_KEY
const secretKey = process.env.SECRET_KEY

router.get('/album/:name/:id', (req,res,next) => {
    let albumArr = []
    axios.get(`https://api.discogs.com/masters/${req.params.id}`)
    .then (response => {
      //console.log(response.data)
      
    axios.get(`https://api.discogs.com/database/search?artist=${req.params.name}&format=album&key=xxngcrMgfixhjsPCBABk&secret=BHHlWipWQaZBkHAuJhBVAkxLOYZWgYlR`)
    .then (response2 => {
    //console.log(req.params.name)
    if (response.data.artists[0].name === req.params.name){ 
        //console.log(response2.data)
    response2.data.results.forEach(album => {
        if(album.title === `${req.params.name} - ${response.data.title}`) {
            console.log(album)
            albumArr.push(album.cover_image)
        }
    })
    }
    res.render('albumTracks', {tracks: response.data, albums: albumArr[0]})
    })

      })
    .catch(err => console.log(err))
  }) 



module.exports = router;