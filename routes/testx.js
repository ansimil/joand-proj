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


router.get('/x/:id', (req,res,next) => {
    const id = req.params.id;
    let userCoord = req.user.coordinates
    let usersWithAlbum = []

    User.find()
    .populate({
        path: "collections",
        model: "Collection",
        populate: {
            path: "albums",
            model: "Album",
        }
    })
    .then(users => {
       // console.log("USERS: ", users)
        users.forEach(user => {
           // console.log("USER", user)
            user.collections.forEach(collection => {
                collection.albums.forEach(album => {
                   //console.log(album.discogsId)
                    if (album.discogsId == id) {
                        usersWithAlbum.push(user.coordinates)
                    }
                })
            })
        })
        db.getMaster(req.params.id, function(err, data){
            if(data.message !== 'Release not found.'){
                if (!data.videos && data.images){
                let img = data.images[0].resource_url
                res.render('./artistsAlbumsTracks/albumTracks', {tracks: data, imgSrc: img, auth: req.isAuthenticated(), user: userCoord, usersArray: usersWithAlbum})}    
                else if (data.videos && data.images){
                    let img = data.images[0].resource_url
                    let vids = []
                    data.videos.forEach(video => {
                        vids.push(video.uri.replace("watch?v=", "embed/"))
                    })
                    
                    res.render('./artistsAlbumsTracks/albumTracks', {tracks: data, imgSrc: img, vids: vids, auth: req.isAuthenticated(), user: userCoord, usersArray: usersWithAlbum})
                }
            }
        })
        console.log("users with album: ", usersWithAlbum)
    })
})

module.exports = router;