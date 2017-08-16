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

describe( "GET /persons", () =>{

  it( "Should return a list of all persons", async () => {

    const res = await request( app )
      .get( "/persons" )
      .expect( 200 )

    expect( res.body ).toBeAn( "array" )
    expect( res.body.length ).toBe( 9 )
    expect( res.body[1] ).toIncludeKeys( ["_id", "name", "employer"] )

  })


})




// "use strict"

// // Todo - Move tests to separate files for readability

// // *****************************************************************************
// // Requires
// // *****************************************************************************

// // Externals

// const expect     = require( "expect" )
// const request    = require( "supertest" )
// const {ObjectID} = require( "mongodb" )

// // Internals

// const {app}  = require( "./../server/server" )
// const {Todo} = require( "./../server/models/todo" )
// const {User} = require( "./../server/models/user" )

// const {todos, populateTodos, users, populateUsers} = require( "./seed/seed" )



// // *****************************************************************************
// // *****************************************************************************
// // Setting up

// beforeEach( populateUsers )

// beforeEach( populateTodos )




// // *****************************************************************************
// // *****************************************************************************
// // Tests

// describe( "POST /todos", () =>{

//   it( "Should create a new todo", ( done ) => {

//     const text = "Dummy todo"

//     request( app )
//       .post( "/todos" )
//       .set( "x-auth", users[0].tokens[0].token )
//       .send({text: text})
//       .expect( 201 )
//       .expect( ( res ) => {
//         expect( res.body.text ).toBe( text )

//       })
//       .end( ( error, res ) => {

//         if ( error ) {
//           return done( error )
//         }

//         Todo.find({text})
//           .then( ( todos ) => {
//             expect( todos.length ).toBe( 1 )
//             expect( todos[0].text ).toBe( text )
//             expect( todos[0]._creator.toHexString() ).toBe( users[0]._id.toHexString() )
//             done()

//           })
//           .catch( ( error ) => done( error ) )

//       })
//   })


//   it( "Should not create a todo with bad data", ( done ) => {

//     request( app )
//       .post( "/todos" )
//       .set( "x-auth", users[0].tokens[0].token )
//       .send({})
//       .expect( 400 )
//       .end( ( error, res ) => {
//         if ( error ) {
//           return done( error )
//         }

//         Todo.find()
//           .then( ( todos ) => {
//             expect( todos.length ).toBe( 2 )
//             done()

//           })
//           .catch( ( error ) => done( error ) )

//       })
//   })


//   it( "Should not create a todo if not authenticated", ( done ) => {

//     request( app )
//       .post( "/todos" )
//       .send({})
//       .expect( 401 )
//       .end( done )


//   })


// })

