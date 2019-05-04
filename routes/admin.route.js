let express = require('express')
let router = express.Router()

router.get('/test', (req, res) => {
    res.send('You should be admin')
})

module.exports = router