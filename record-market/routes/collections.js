const router = require("express").Router();
const User = require('../models/User.model')
const Collection = require('../models/Collection')
const loginCheck = require('../utils/loginCheck')



router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .populate('collections')
        .then(userFromDB => {
            res.render('collections/show', {user: userFromDB})
        })
        .catch(err => next(err))
})

router.get('/:id/add', (req, res, next) => {
    User.findById(req.params.id)
        .then(userFromDB => {
            res.render('collections/new', {user: userFromDB})
        })
        .catch(err => next(err))
})

router.post('/:id/add', (req, res, next) => {
    const  { name, description } = req.body
    Collection.create({ name, description})
        .then((createdCollection) => {
            User.findByIdAndUpdate(req.params.id, {
                $push: {collections: [createdCollection] }
            })
            .then(() => {
                res.redirect(`/collections/${req.params.id}`)
            })
        })           
        .catch(err => next(err))
    })



module.exports = router;