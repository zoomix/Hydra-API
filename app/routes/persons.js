
// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

const express  = require( "express" )
const router = express.Router()

const { catchErrors } = require( "../handlers/errorHandlers" )

const personController = require ( "../controllers/personController" )





// *****************************************************************************
// *****************************************************************************
// Index routes

// Show landing page
router.get( "/persons", catchErrors( personController.getPersons ) )
router.post( "/persons", catchErrors( personController.addPerson ) )







// ****************************************************************************
// ****************************************************************************
// Exports

module.exports = router
