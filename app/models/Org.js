// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

const mongoose = require( "mongoose" )

mongoose.Promise = global.Promise

const slugify = require( "voca/slugify" )





// *****************************************************************************
// *****************************************************************************
// Model definition

const orgSchema = new mongoose.Schema({

  name: {
    type    : String,
    trim    : true,
    required: "Please enter a store name!"
  },

  slug: String,

  description: {
    type: String,
    trim: true
  },

  created: {
    type   : Date,
    default: Date.now
  },

  contacts: {
    own: [{
      role  : String,
      person: {
        type: mongoose.Schema.ObjectId,
        ref : "Person"
      }
    }],

    ours: [{
      role  : String,
      person: {
        type: mongoose.Schema.ObjectId,
        ref : "Person"
      }
    }],

    external: [{
      role  : String,
      person: {
        type: mongoose.Schema.ObjectId,
        ref : "Person"
      }
    }]
  }

}, {
  toJSON  : { virtuals: true },
  toObject: { virtuals: true}
})





// *****************************************************************************
// *****************************************************************************
// Pre methods


orgSchema.pre( "save", async function ( next ) {

  if ( !this.isModified( "name" ) ) {
    return next()
  }

  this.slug = slugify( this.name )


  const slugRegEx = new RegExp( `^(${this.slug})((-[0-9]*$)?)$`, "i" )
  const storesWithSlug = await this.constructor.find({ slug: slugRegEx })

  if ( storesWithSlug.length ) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`
  }


  next()

})





// *****************************************************************************
// *****************************************************************************
// Virtuals

orgSchema.virtual( "employees", {
  ref         : "Person",
  localField  : "_id",
  foreignField: "employer.org"
})

orgSchema.virtual( "projects", {
  ref         : "Project",
  localField  : "_id",
  foreignField: "org"
})




// *****************************************************************************
// *****************************************************************************
// Exports

module.exports = mongoose.model( "Org", orgSchema )
