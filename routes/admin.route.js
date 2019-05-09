let express = require('express')
let router = express.Router()
let user_controller = require('../controllers/user.controller')

router.get('/', user_controller.user_count,(req, res) => {
    res.render('admin/dashboard', { data: res.locals })
})

module.exports = router