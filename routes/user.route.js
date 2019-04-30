let express = require('express')
let passport = require('passport')
let router = express.Router()
let user_controller = require('../controllers/user.controller')

router.post('/create', user_controller.user_create)
router.get('/create', (req, res) => {
    res.render('user/create')
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login' }), (req, res) => {
    res.redirect('/')
})
router.get('/login', (req, res) => {
    res.render('user/login')
})

module.exports = router