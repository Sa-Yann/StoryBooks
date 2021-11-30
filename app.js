
const path = require('path') //core Node.js module
// const express = require("express") is creatting the server
const express = require('express')
const mongoose = require('mongoose')
// dotenv is wher we have our variables for configuration 
// Dotenv is a zero-dependency module that loads environment variables 
// from a .env file into process.env using dotenv.config() (good practice)
const dotenv = require("dotenv")
// morgan to be sure that everytime there s a request to the BDD it s shown in the console
// morgan is HTTP request Terminal logger middleware for node.js
const morgan = require("morgan")

// connectDB is the function that allows connection to our Data Base
const connectDB = require('./config/db')

const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session') // to be able to use passport middleware
// const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants')
const MongoStore = require('connect-mongo')
// to load config files from te folder config in the file config.env
// the port variable is defined in the config file.env file
// config() Loads .env file contents into | process.env. Example: 'KEY=value' becomes { parsed: { KEY: 'value' } }
dotenv.config({ path: './config/config.env' })



// ------------------------------------------------------------------------
// passport config required with (passport) as an argument at the end of the require to 
// specify we wonna use what is in the ./config/passport file
// ------------------------------------------------------------------------
require('./config/passport')(passport)

// test connection OK
connectDB()

//  initialising the app with expres
const app = express()

// Logging
if (process.env.NODE_ENV === 'development') {
    // the NODE_ENV was define in the script section in the package.json file right after installation
    // if cause we just want to use morgan in developpment mode
    app.use(morgan('dev'))
}


// ------------------------------------------------------------------------
// sets up an Express app to use .hbs (handelbars) as the file extension for views:
// add defaultLayout: 'main' the  template default layout inour case main
// ------------------------------------------------------------------------
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(session({
    secret: 'keyboard cat',
    // resave: false, : we dont want to save a session unless something is modified
    resave: false,
    // saveUninitialized set to false : don't create a session until something stored
    saveUninitialized: false,
    // cookie: { secure: true } onlyworks with https
    // we store our session info into our DB in order to not get signed out when page is getting refreshed by nodemon in dev or user in browser
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    
}))



// ------------------------------------------------------------------------
//Adding the passport middleware initialize and session methode/class
// https://github.com/jaredhanson/passport-google-oauth2
// ------------------------------------------------------------------------
app.use(passport.initialize())
app.use(passport.session())

// ------------------------------------------------------------------------
// app link to the Static folder where we locate all the files seen by users ( css/images)
// path.join(--dirname whic means direct folder , 'the name of the folder to find teh static/public files')
// ------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public'))) // __dirname : meanswe describe our path from the curent directory/file app.js



// ------------------------------------------------------------------------
// !!!!! ROUTES SET UP
// ------------------------------------------------------------------------
// HERE WE TELL THE APP THAT IT WILL BE DESPLAYING VIEWS BY USING THE index.js file in the routes folder
app.use('/', require('./routes/index'))
// or the auth.js when required by passport use of authentification
app.use('/auth', require('./routes/auth'))



// Node.js exposes the current process's environment variables 
// to the script as an object called process.env
// on relie le port choisie via config({ path: './config/config.env' })
const PORT = process.env.PORT || 5000
// check following for better understanding of process.env
// console.log(process.env)


app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
    console.log(`${process.env.NODE_ENV}`)
)