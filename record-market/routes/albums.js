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


router.get('/album/:id', (req,res,next) => {
    let albumArr = []
    db.getMaster(req.params.id, function(err, data){
         //console.log(data);
        if(data.message !== 'Release not found.'){
        //console.log(data)
        if (!data.videos && data.images){
        let img = data.images[0].resource_url
        res.render('albumTracks', {tracks: data, imgSrc: img, auth: req.isAuthenticated()})}
        else if (data.videos && data.images){
            let img = data.images[0].resource_url
            let vids = []
            data.videos.forEach(video => {
                vids.push(video.uri.replace("watch?v=", "embed/"))
            })
            console.log(vids)
            //let vid = data.videos[0].uri.replace("watch?v=", "embed/") 
            res.render('albumTracks', {tracks: data, imgSrc: img, vids: vids, auth: req.isAuthenticated()}) 
        }
    }
    else {
        res.render('albumTracks') 
    }
        //console.log('done')
    });

})
    // axios.get(`https://api.discogs.com/masters/${req.params.id}`)
    // .then (response => {
    //   //console.log(response.data)
      
    // axios.get(`https://api.discogs.com/database/search?artist=${req.params.name}&format=album&key=xxngcrMgfixhjsPCBABk&secret=BHHlWipWQaZBkHAuJhBVAkxLOYZWgYlR`)
    // .then (response2 => {
    // //console.log(req.params.name)
    // if (response.data.artists[0].name === req.params.name){ 
    //     //console.log(response2.data)
    // response2.data.results.forEach(album => {
    //     if(album.title === `${req.params.name} - ${response.data.title}`) {
    //         console.log(album)
    //         albumArr.push(album.cover_image)
    //     }
    // })
    // }
    // res.render('albumTracks', {tracks: response.data, albums: albumArr[0]})
    // )

    //   })
    // .catch(err => console.log(err))
  



module.exports = router;