
// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

const express  = require( "express" )
const router = express.Router()


const { catchErrors } = require( "../handlers/errorHandlers" )
const projectController = require ( "../controllers/projectController" )





// *****************************************************************************
// *****************************************************************************
// Index routes

// Basic routes
router.get( "/projects", catchErrors( projectController.getProjects ) )
router.post( "/projects", catchErrors( projectController.addProject ) )

// router.get( "/orgs/:orgId", catchErrors( orgController.getOrg ) )
// router.delete( "/orgs/:orgId", catchErrors( orgController.deleteOrg ) )





// ****************************************************************************
// ****************************************************************************
// Exports

module.exports = router
