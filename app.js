// const express = require("express") is creatting the server
const express = require("express")
// dotenv is wher we have our variables for configuration 
// Dotenv is a zero-dependency module that loads environment variables 
// from a .env file into process.env using dotenv.config() (good practice)
const dotenv = require("dotenv")
// morgan to be sure that everytime there s a request to the BDD it s shown in the console
const morgan = require("morgan")
// connectDB is the function that allows connection to our Data Base
const connectDB = require('./config/db')
// morgan is HTTP request logger middleware for node.js
const exphbs = require('express-handlebars')

//  to load config files from te folder config in the file config.env
// the port is in the config file.env file
// config() Loads .env file contents into | process.env. Example: 'KEY=value' becomes { parsed: { KEY: 'value' } }
dotenv.config({ path: './config/config.env' })

// test connection OK
connectDB()

//  initialising the app
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



// Node.js exposes the current process's environment variables 
// to the script as an object called process.env
// on relie le port choisie via config({ path: './config/config.env' })
const PORT = process.env.PORT || 5000
// check following for better understanding of process.env
// console.log(process.env)


app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)