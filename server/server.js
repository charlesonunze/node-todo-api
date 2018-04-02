const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');
const {authenticate} = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// TODOS SECTION
app.post('/todos', (req, res) => {
  const todo = new Todo({text: req.body.text});

  todo
    .save()
    .then((doc) => {
      res.send(doc);
    }, (e) => {
      res
        .status(400)
        .send(e);
    });
});

app.get('/todos', (req, res) => {
  Todo
    .find()
    .then((todos) => {
      res.send({todos});
    }, (e) => {
      res
        .status(400)
        .send(e);
    });
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;
  // validateID(id)
  if (!ObjectID.isValid(id)) 
    return res
      .status(404)
      .send({Error: 'Invalid ID'});
  
  Todo
    .findById(id)
    .then((todo) => {
      // validateID(id)
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
});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;
  // validateID(id)
  if (!ObjectID.isValid(id)) 
    return res
      .status(404)
      .send({Error: 'Invalid ID'});
  
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
});

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  // validateID(id)
  if (!ObjectID.isValid(id)) 
    return res
      .status(404)
      .send({Error: 'Invalid ID'});
  
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo
    .findByIdAndUpdate(id, {
      $set: body
    }, {new: true})
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
});

// USERS SECTION
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  const user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then((token) => {
      res
        .header('x-auth', token)
        .send(user);
    })
    .catch((e) => {
      res
        .status(400)
        .send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Server started... ${port}`);
});
