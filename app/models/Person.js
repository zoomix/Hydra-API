// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

const mongoose = require( "mongoose" )

mongoose.Promise = global.Promise






// *****************************************************************************
// *****************************************************************************
// Model definition

const personSchema = new mongoose.Schema({

  name: {
    type    : String,
    trim    : true,
    required: "Please enter a store name!"
  },

  created: {
    type   : Date,
    default: Date.now
  },

  employer: {
    role: String,
    org : {
      type: mongoose.Schema.ObjectId,
      ref : "Org"
    }
  }

}, {
  toJSON  : { virtuals: true },
  toObject: { virtuals: true}
})





// *****************************************************************************
// *****************************************************************************
// Virtuals

// storeSchema.virtual( "reviews", {
//   ref         : "Review",
//   localField  : "_id",
//   foreignField: "store"
// })





// *****************************************************************************
// *****************************************************************************
// Exports

module.exports = mongoose.model( "Person", personSchema )
