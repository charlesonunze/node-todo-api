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
  //delete many
  db
    .collection( 'Todos' )
    .deleteMany( { text: 'Something to do' } )
    .then( ( result ) => {
      console.log( result );
    }, ( err ) => {
      console.log( err );
    } )
  //delete one
  // findone and delete

  // client.close();
} );
