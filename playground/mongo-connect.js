const { MongoClient } = require( 'mongodb' );
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

MongoClient.connect( 'mongodb://localhost:27017', ( err, client ) => {
  if ( err ) 
    return console.log( 'Unable to connect to Mongo server' );
  console.log( 'Connected to MongoDB server' );

  const db = client.db( dbName );

  db
    .collection( 'Todos' )
    .insertOne( {
      text: 'Something to do 3.0',
      completed: false
    }, ( err, result ) => {
      if ( err ) 
        return console.log( 'Unable to insert Todo' );
      console.log( result.ops );
    } );

  db
    .collection( 'User' )
    .insertOne( {
      name: 'XCXCXC Charles',
      age: 21,
      location: 'earth'
    }, ( err, result ) => {
      if ( err ) 
        return console.log( 'Unable to insert User' );
      console.log( result.ops );
    } );

  client.close();
} );
