
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
router.get( "/orgs/:orgId", catchErrors( orgController.getOrg ) )
router.delete( "/orgs/:orgId", catchErrors( orgController.deleteOrg ) )


// Handle contacs
router.get( "/orgs/:orgId/contacts", catchErrors( orgController.getContacts ) )
router.post( "/orgs/:orgId/contacts", catchErrors( orgController.addContact ) )









// ****************************************************************************
// ****************************************************************************
// Exports

module.exports = router
