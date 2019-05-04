let bcrypt = require('bcrypt')
let User = require('../models/user.model')

/*exports.user_all = (req, res, next) => {
    User.find((err, user) => {
        if (err) throw err
        res.locals['user'] = user
        next()
    })
}*/

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

exports.user_create = (req, res, next) => {
    if (req.body.username && req.body.password && req.body.isAdmin) {
        User.findOne({ username: req.body.username}, (err, user) => {
            if (err) throw err
            if (user) {
                res.redirect('/users/create')
            } else {
                let password = req.body.password
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err
                        let user = new User({
                            username: req.body.username,
                            password: hash,
                            isAdmin: req.body.isAdmin
                        })
                        user.save((err) => {
                            if (err) throw err
                            next()
                        })
                    })
                })
            }
        })
    } else {
        res.redirect('/users/create')
    }
}