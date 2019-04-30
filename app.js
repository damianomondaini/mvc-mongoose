let express = require('express')
let bodyParser = require('body-parser')
let morgan = require('morgan')
let cookieParser = require('cookie-parser')
let expressSession = require('express-session')
let passport = require('passport')

require('dotenv').config()
require('./config/db')

let main = require('./routes/main.route')
let user = require('./routes/user.route')

let app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined'))
app.use(cookieParser('foo'))
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: 'secret'
}))

require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

app.use('/', main)
app.use('/users', user)

app.listen(process.env.PORT)