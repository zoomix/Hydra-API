// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

// *****************************************************************************
// *****************************************************************************
// Requires and basic setup

const mongoose = require( "mongoose" )
const Org = mongoose.model( "Org" )

const {ObjectID} = require( "mongodb" )





// *****************************************************************************
// *****************************************************************************
// Controllers

async function getOrgs ( req, res ) {

  const orgs = await Org
    .find({})
    .sort({ created: "desc"})

  res.json( orgs )


}





async function getOrg ( req, res ) {

  const orgId = req.params.orgId

  if ( !ObjectID.isValid( orgId ) ) {
    return res.status( 400 ).send()
  }


  const org = await Org
    .findById( orgId )
    .populate( "employees projects" )


  res.json( org )

}





async function addOrg ( req, res ) {

  const newOrg = {
    name       : req.body.name,
    description: req.body.description

  }


  const org = await ( new Org( newOrg ) ).save()


  res.status( 201 ).json( org )

}





async function deleteOrg ( req, res ) {

  const orgId = req.params.orgId

  if ( !ObjectID.isValid( orgId ) ) {
    return res.status( 400 ).send()
  }

  console.log( "Deleting org" )

  const org = await Org.findByIdAndRemove( orgId )


  res.json( org )

}





// TODO add PATCH org by id
// TODO add PATCH org by id
// TODO add PATCH org by id





async function getContacts ( req, res ) {

  const org = await Org
    .findById( req.params.orgId, {contacts: 1})
    .populate( "contacts.ours.person contacts.external.person contacts.own.person" )

  res.json( org )

}





async function addContact ( req, res ) {


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

  res.status( 201 ).json( org )


}





// TODO Delete contact
// TODO Delete contact
// TODO Delete contact





// *****************************************************************************
// *****************************************************************************
// Module exports

module.exports = {
  getOrgs,
  getOrg,
  addOrg,
  deleteOrg,
  getContacts,
  addContact
}


