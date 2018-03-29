const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({ text: req.body.text });

  todo
    .save()
    .then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400)
        .send(e);
    });
});

app.get('/todos', (req, res) => {
  Todo
    .find()
    .then((todos) => {
      res.send({ todos });
    }, (e) => {
      res.status(400)
        .send(e);
    });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) return res.status(404)
    .send({ Error: 'Invalid ID' });

  Todo
    .findById(id)
    .then((todo) => {
      if (!todo) return res.status(404)
        .send({ Error: 'Page not found' });

      res.send({ todo });
    })
    .catch((e) => {
      res.status(400)
        .send(e);
    });
});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) return res.status(404)
    .send({ Error: 'Invalid ID' });

  Todo
    .findByIdAndDelete(id)
    .then((todo) => {
      if (!todo) return res.status(404)
        .send({ Error: 'Page not found' });

      res.send({ todo });
    })
    .catch((e) => {
      res.status(400)
        .send(e);
    });
});

app.listen(3000, () => {
  console.log('Server started...');
});