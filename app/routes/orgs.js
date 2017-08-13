
// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

const express  = require( "express" )
const router = express.Router()


const { catchErrors } = require( "../handlers/errorHandlers" )

const orgController = require ( "../controllers/orgController" )


// *****************************************************************************
// *****************************************************************************
// Index routes

// Basic routes
router.get( "/orgs", catchErrors( orgController.getOrgs ) )
router.post( "/orgs", catchErrors( orgController.addOrg ) )


// Handle contacs
router.get( "/orgs/:orgId/contacts", catchErrors( orgController.getContacts ) )
router.post( "/orgs/:orgId/contacts/ours", catchErrors( orgController.addContact ) )









// ****************************************************************************
// ****************************************************************************
// Exports

module.exports = router
