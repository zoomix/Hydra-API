// *****************************************************************************
// *****************************************************************************
// Configure environment

require( "./config/config.js" )





// *****************************************************************************
// *****************************************************************************
// Requires and constants

// Externals


const express          = require( "express" )
const bodyParser       = require( "body-parser" )
const expressValidator = require( "express-validator" )
const morgan           = require( "morgan" )


// Internals

const {mongoose} = require( "./db/mongoose" )


const routes = require( "./routes/index" )

const errorHandlers = require( "./handlers/errorHandlers" )





// *****************************************************************************
// *****************************************************************************
// App setup

// create our Express app
const app = express()


// Use logger if in dev
if ( app.get( "env" ) === "development" ) {

  app.use( morgan( "dev" ) )

}


// Takes the raw requests and turns them into usable properties on req.body
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }) )


// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use( expressValidator() )


// After allllll that above middleware, we finally handle our own routes!
app.use( "/", routes )


// If that above routes didnt work, we 404 them and forward to error handler
app.use( errorHandlers.notFound )


// Otherwise this was a really bad error we didn't expect! Shoot eh
if ( app.get( "env" ) === "development" ) {

  app.use( errorHandlers.developmentErrors )

}


// production error handler
app.use( errorHandlers.productionErrors )





// *****************************************************************************
// *****************************************************************************
// Exports for testing and so we can start the site in start.js

module.exports = app

