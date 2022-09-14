const router = require("express").Router();
const { default: axios } = require("axios");
//const { Collection } = require("mongoose");
const consumerKey = process.env.CONSUMER_KEY
const secretKey = process.env.SECRET_KEY
var Discogs = require('disconnect').Client;
const passport = require('passport');
const Album = require("../models/Album");
const User = require('../models/User.model');
const loginCheck = require('../utils/loginCheck');
const Collection = require('../models/Collection')


var dis = new Discogs({
	consumerKey: consumerKey, 
	consumerSecret: secretKey
});

var db = dis.database();


router.get('/album/:id', (req,res,next) => {
    let albumArr = []
    let collectionArr = []
    Album.find({ 'discogsId': req.params.id })
    .then(data => {
        data.forEach(album => {
        Collection.find({'albums' : album._id})
        .then(data2 => {
            data2.forEach(collection => {
            User.find({'collections': collection._id})
            .then(data3 => {
                    console.log(data3)
            })    
            })
        })
        })
    })       
    
    
    db.getMaster(req.params.id, function(err, data){
        if(data.message !== 'Release not found.'){
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
    });

})

router.get('/album/:id/add', loginCheck(), (req, res, next) =>{
    const userId = req.user._id
    User.findById(userId)
    .populate('collections')
    .then(user => {
        res.render('./artistsAlbumsTracks/addAlbumToCollection', {user: user, auth: req.isAuthenticated(), releaseId: req.params.id})
    })
    .catch(err => next(err))
    })

router.post('/album/:id/add', loginCheck(), (req, res, next)=>{

    db.getMaster(req.params.id, function(err, data){
        //console.log(req.params.id) 
        const discogsId = req.params.id    
        const name = data.title
        const artist = data.artists[0].name
        const imgName = data.images[0].type
        const imgPath = data.images[0].uri 
        const release = data.year
        const price = data.lowest_price
        const userPrice = 0
        const tracks = []
        data.tracklist.forEach(track =>{
            tracks.push({name: track.title, duration: track.duration})
        })   
    const collectionID = req.body.collection
    Album.create({ name, artist, imgName, imgPath, release, price, userPrice, tracks, discogsId })
            .then((createdAlbum) => {
                Collection.findByIdAndUpdate(collectionID, {
                    $push: { albums: [createdAlbum] }
                })
                .then(() => {
                    res.redirect(`/collections/collection/${collectionID}`)  
                })
      })
    })
});



module.exports = router;
