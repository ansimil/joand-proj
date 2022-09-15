// const router = require("express").Router();
// const { default: axios } = require("axios");
// //const { Collection } = require("mongoose");
// const consumerKey = process.env.CONSUMER_KEY
// const secretKey = process.env.SECRET_KEY
// var Discogs = require('disconnect').Client;
// const passport = require('passport');
// const Album = require("../models/Album");
// const User = require('../models/User.model');
// const loginCheck = require('../utils/loginCheck');
// const Collection = require('../models/Collection')


// var dis = new Discogs({
// 	consumerKey: consumerKey, 
// 	consumerSecret: secretKey
// });

// var db = dis.database();

// router.get('/x', (req,res,next) => {
//     let userCoord = req.user.coordinates
//     let albumsArr = []
//     let collectionArr = []
//     let usersArr = []

// // User.find({collections: {_id: '6321851a90745fdb1ad817b8'}})
// // .populate({
// //     path: 'collections',
// //     populate: {
// //         path: 'albums',
// //     }
// // })
// // .then ((users) => res.send(users))

// // Collection.find({albums: {_id: '6321aa0d5d4e4417b6282a05'}})
// // .populate('albums')
// // .then ((users) => res.send(users))

// User.find({collections: {albums: {_id: '6321aa0d5d4e4417b6282a05'}}})
// .populate({
//     path: 'collections',
//     populate: {
//         path: 'albums',
//     }
// })
// .then ((users) => res.send(users))


// // Project.find(query)
// //   .populate({ 
// //      path: 'pages',
// //      populate: {
// //        path: 'components',
// //        model: 'Component'
// //      } 
// //   })


//     // db.getMaster(req.params.id, function(err, data){
//     //     if(data.message !== 'Release not found.'){
//     //         if (!data.videos && data.images){
//     //         let img = data.images[0].resource_url
//     //         res.render('./artistsAlbumsTracks/albumTracks', {tracks: data, imgSrc: img, auth: req.isAuthenticated(), user: userCoord})}

//     //         else if (data.videos && data.images){
//     //             let img = data.images[0].resource_url
//     //             let vids = []
//     //             data.videos.forEach(video => {
//     //                 vids.push(video.uri.replace("watch?v=", "embed/"))
//     //             })
                
//     //             res.render('./artistsAlbumsTracks/albumTracks', {tracks: data, imgSrc: img, vids: vids, auth: req.isAuthenticated(), user: userCoord})
//     //         }
//     //     }
//     // });

// })

// module.exports = router;