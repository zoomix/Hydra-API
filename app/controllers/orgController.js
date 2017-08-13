// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

const mongoose = require( "mongoose" )
const Org = mongoose.model( "Org" )



// *****************************************************************************
// *****************************************************************************
// Controllers

async function getOrgs ( req, res ) {

  const orgs = await Org
    .find({})
    .sort({ created: "desc"})

  res.json( orgs )


}



async function addOrg ( req, res ) {

  const newOrg = {
    name       : req.body.name,
    description: req.body.description

  }

  const org = await ( new Org( newOrg ) ).save()


  res.json( org )

}


// TODO add GET org by id
// TODO add DEL org by id
// TODO add PATCH org by id




async function getContacts ( req, res ) {

  const org = await Org
    .findById( req.params.orgId, {contacts: 1})
    .populate( "contacts.ours.person contacts.external.person contacts.own.person" )

  res.json( org )

}





async function addContact ( req, res ) {

  console.log( req.params )
  console.log( req.body )

  const newContact= {
    role  : req.body.role,
    person: req.body.person
  }

  const contactType =  `contacts.${req.body.level}`

  const org = await Org.findByIdAndUpdate(
    req.params.orgId,
    {
      $addToSet: {
        [contactType]: newContact
      }
    },
    {
      new: true
    }
  )

  res.json( org )


}



// TODO Delete contact


// *****************************************************************************
// *****************************************************************************
// Module exports

module.exports = {
  getOrgs,
  addOrg,
  getContacts,
  addContact
}


