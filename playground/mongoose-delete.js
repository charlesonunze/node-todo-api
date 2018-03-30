const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const id = '5abaabba4f47713df69b8e8a';

if (!ObjectID.isValid(id)) 
  return console.log(`ID not valid`);

Todo
  .remove({})
  .then((obj) => {
    res.send({obj.result});
  })
  .catch((e) => {
    res
      .status(400)
      .send(e);
  });

Todo
  .findOneAndRemove({})
  .then((todo) => {
    if (!todo) 
      return res
        .status(404)
        .send({Error: 'Page not found'});
    
    res.send({todo});
  })
  .catch((e) => {
    res
      .status(400)
      .send(e);
  });

Todo
  .findByIdAndRemove(id)
  .then((todo) => {
    if (!todo) 
      return res
        .status(404)
        .send({Error: 'Page not found'});
    
    res.send({todo});
  })
  .catch((e) => {
    res
      .status(400)
      .send(e);
  });
