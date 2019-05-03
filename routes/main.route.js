let express = require('express')
let connect = require('connect-ensure-login')
let router = express.Router()

let main_controller = require('../controllers/main.controller')

router.get('/', connect.ensureLoggedIn('/users/login'), main_controller.main_index)

module.exports = router