// *****************************************************************************
// *****************************************************************************
// Requires and basics

const express = require( "express" )
const router = express.Router()


const orgs = require( "./orgs" )
const persons = require( "./persons" )
const projects = require( "./projects" )



// *****************************************************************************
// *****************************************************************************
// Master router

router.get( "/", ( req, res ) =>{

  res.status( 200 ).json({it: "worked"})


})





// ****************************************************************************
// ****************************************************************************
// Add all routes
router.use( orgs )
router.use( persons )
router.use( projects )





// ****************************************************************************
// ****************************************************************************
// Exports

module.exports = router
