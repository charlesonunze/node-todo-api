const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');

const id = '5abaabba4f47713df69b8e8a';

if (!ObjectID.isValid(id)) return console.log(`ID not valid`);

Todo.find({ _id: id })
  .then((todos) => {
    if (todos.length === 0) return console.log(`ID not found`);
    console.log('Todos', todos);
  });


Todo.findOne({ _id: id })
  .then((todo) => {
    if (!todo) return console.log(`ID not found`);
    console.log('TodoFindOne', todo);
  });


Todo.findById(id)
  .then((todo) => {
    if (!todo) return console.log(`ID not found`);
    console.log('TodoById', todo);
  });