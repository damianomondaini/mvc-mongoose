let bcrypt = require('bcrypt')
let User = require('../models/user.model')

exports.user_username = (username, cb) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            return cb(null, null)
        } else {
            return cb(null, user)
        }
    })
}

exports.user_id = (id, cb) => {
    User.findById(id, (err, user) => {
        if (err) {
            return cb(null, null)
        } else {
            return cb(null, user)
        }
    })
}

exports.user_create = (req, res) => {
    User.findOne({ username: req.body.username}, (err, user) => {
        if (err) throw err
        if (user) {
            res.redirect('/users/create')
        } else {
            var password = req.body.password
            let salt = Math.floor(Math.random() * (15 - 6 + 1) ) + 6
            bcrypt.hash(password, salt, (err, hash) => {
            let user = new User({
                username: req.body.username,
                password: hash
            })
            user.save((err) => {
                if (err) throw err
                res.redirect('/')
            })
        })
        }
    })
}