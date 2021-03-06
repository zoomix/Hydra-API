// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

const mongoose = require( "mongoose" )
const Person = mongoose.model( "Person" )



// *****************************************************************************
// *****************************************************************************
// Controllers

async function getPersons ( req, res ) {

  const query = {}

  const projection = {
    "name"    : 1,
    "employer": 1
  }

  const population = {
    path  : "employer.org",
    select: "name"
  }

  const persons = await Person
    .find( query, projection )
    .populate( population )
    .sort({ created: "desc"})


  res.json( persons )


}



async function addPerson ( req, res ) {

  const newPerson = {
    name    : req.body.name,
    employer: req.body.employer
  }

  const person = await ( new Person( newPerson ) ).save()


  res.status( 201 ).json( person )

}


// TODO add GET org by id
// TODO add DEL org by id
// TODO add PATCH org by id



// *****************************************************************************
// *****************************************************************************
// Module exports

module.exports = {
  getPersons,
  addPerson
}


