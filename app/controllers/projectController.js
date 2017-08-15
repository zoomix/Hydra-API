// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

const mongoose = require( "mongoose" )
const Project = mongoose.model( "Project" )


const getTime = require( "date-fns/get_time" )





// *****************************************************************************
// *****************************************************************************
// Controllers

async function getProjects ( req, res ) {

  const projects = await Project
    .find({})
    .sort({ created: "desc"})

  res.json( projects )


}



async function addProject ( req, res ) {

  // TODO: Validation
  const newProject = {
    org          : req.body.org,
    level        : req.body.level,
    name         : req.body.name,
    description  : req.body.description,
    startDate    : getTime( req.body.startDate ),
    endDate      : getTime( req.body.endDate ),
    currentStatus: req.body.currentStatus,
    tags         : req.body.tags
  }


  const project = await ( new Project( newProject ) ).save()


  res.status( 201 ).json( project )

}


// TODO add GET org by id
// TODO add DEL org by id
// TODO add PATCH org by id



// *****************************************************************************
// *****************************************************************************
// Module exports

module.exports = {
  getProjects,
  addProject
}


