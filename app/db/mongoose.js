// *****************************************************************************
// Requires
// *****************************************************************************

const mongoose = require( "mongoose" )




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

require( "./../models/Org" )
require( "./../models/Person" )
require( "./../models/Project" )




// *****************************************************************************
// *****************************************************************************
// Exports

module.exports = mongoose
