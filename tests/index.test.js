// *****************************************************************************
// Requires
// *****************************************************************************

// Externals

const expect     = require( "expect" )
const request    = require( "supertest" )
const {ObjectID} = require( "mongodb" )

// Internals

const app  = require( "./../app/app" )


// *****************************************************************************
// *****************************************************************************
// Setting up


// *****************************************************************************
// *****************************************************************************
// Tests

describe( "GET /", () =>{

  it( "Should return an object, {it worked}", async () => {

    const res = await request( app )
      .get( "/" )
      .expect( 200 )

    expect( res.body ).toBeAn( "object" )
    expect( res.body ).toEqual({it: "worked"})


  })


})

