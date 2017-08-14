// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

const mongoose = require( "mongoose" )

mongoose.Promise = global.Promise

const slugify = require( "voca/slugify" )





// *****************************************************************************
// *****************************************************************************
// Model definition

const projectSchema = new mongoose.Schema({

  org: {
    type    : mongoose.Schema.ObjectId,
    ref     : "Org",
    required: "Please connect to an organisation"
  },

  level: {
    type     : String,
    enum     : ["group", "project"],
    lowercase: true,
    trim     : true,
    required : "Must have a level"
  },

  name: {
    type     : String,
    lowercase: true,
    trim     : true,
    required : "Please enter a project name!"
  },

  slug: String,

  description: {
    type    : String,
    trim    : true,
    required: true
  },

  startDate: Number,

  endDate: Number,

  currentStatus: {
    type: String
  },

  links: [{
    name: String,
    url : String
  }],

  tags: {
    type     : [String],
    trim     : true,
    lowercase: true
  },


  created: {
    type   : Date,
    default: Date.now
  },

  participants: {
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

// Sluggification
projectSchema.pre( "save", async function ( next ) {

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

// projectSchema.virtual( "employees", {
//   ref         : "Person",
//   localField  : "_id",
//   foreignField: "employer.org"
// })





// *****************************************************************************
// *****************************************************************************
// Exports

module.exports = mongoose.model( "Project", projectSchema )
