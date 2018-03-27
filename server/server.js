const express = require( 'express' );
const bodyParser = require( 'body-parser' );

const { mongoose } = require( './db/mongoose' );
const { User } = require( './models/user' );
const { Todo } = require( './models/todo' );

const app = express();

app.use( bodyParser.json() );

app.post( '/todos', ( req, res ) => {

  const todo = new Todo( { text: req.body.text } );

  todo
    .save()
    .then( ( doc ) => {
      res.send( doc );
    }, ( e ) => {
      res.send( e );
    } )

} );

app.get( '/todos', ( req, res ) => {
  Todo
    .find()
    .then( ( todos ) => {
      res.send( { todos } );
    }, ( e ) => {
      res.send( e );
    } )
} );

app.listen( 3000, () => {
  console.log( 'Server started...' );
} );
