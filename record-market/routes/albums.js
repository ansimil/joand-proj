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


router.get('/album/:id', (req,res,next) => {
    let albumArr = []
    db.getMaster(req.params.id, function(err, data){
        if(data.message !== 'Release not found.'){
        console.log(data)
        if (!data.videos && data.images){
        let img = data.images[0].resource_url
        res.render('./artistsAlbumsTracks/albumTracks', {tracks: data, imgSrc: img, auth: req.isAuthenticated()})}
        else if (data.videos && data.images){
            let img = data.images[0].resource_url
            let vids = []
            data.videos.forEach(video => {
                vids.push(video.uri.replace("watch?v=", "embed/"))
            })
            //console.log(vids)
            //let vid = data.videos[0].uri.replace("watch?v=", "embed/") 
            res.render('./artistsAlbumsTracks/albumTracks', {tracks: data, imgSrc: img, vids: vids, auth: req.isAuthenticated()}) 

        }
    }
    else {
        res.render('albumTracks') 
    }
        //console.log('done')
    });

})

router.get('/album/:id/add', (req, res, next) =>{
    const userId = req.user._id
    console.log(userId)
    User.findById(userId)
    .populate('collections')
    .then(user => {
        console.log(user)
        res.render('./artistsAlbumsTracks/addAlbumToCollection', {user: user, auth: req.isAuthenticated()})
    })
    .catch(err => next(err))
    })



module.exports = router;