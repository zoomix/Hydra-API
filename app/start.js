// *****************************************************************************
// *****************************************************************************
// Imports

const mongoose = require( "mongoose" )





// *****************************************************************************
// *****************************************************************************
// import environmental variables from our variables.env file

require( "./config/config.js" )





// *****************************************************************************
// *****************************************************************************
// Connect to our Database and handle a bad connections
mongoose.connect( process.env.DB_URI, {useMongoClient: true})

mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises

mongoose.connection.on( "error", ( err ) => {
  console.error( `🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}` )
})





// *****************************************************************************
// *****************************************************************************
// import all models

require( "./models/Org" )
require( "./models/Person" )





// *****************************************************************************
// *****************************************************************************
// Start our app!

const app = require( "./app" )

app.set( "port", process.env.PORT || 7777 )

const server = app.listen( app.get( "port" ), () => {

  console.log( `Express running → PORT ${server.address().port}` )

})
