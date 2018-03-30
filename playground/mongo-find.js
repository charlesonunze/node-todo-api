const {MongoClient} = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'TodoApp';

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  if (err) 
    return console.log('Unable to connect to Mongo server');
  console.log('Connected to MongoDB server');

  const db = client.db(dbName);

  db
    .collection('Todos')
    .find()
    .toArray()
    .then((docs) => {
      console.log(docs);
    }, (err) => {
      if (err) 
        return console.log(err);
      }
    );

  db
    .collection('User')
    .find({name: 'Charles'})
    .toArray()
    .then((docs) => {
      console.log(docs);
    }, (err) => {
      if (err) 
        return console.log(err);
      }
    );
  // client.close();
});
