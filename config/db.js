// MongoDB Atlas database set up

let mongoose = require('mongoose')
let mongoDB = process.env.MONGODB_URI
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useFindAndModify: false
})
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
