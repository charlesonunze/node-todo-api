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
app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({text: req.body.text, _creator: req.user._id});

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

app.get('/todos', authenticate, (req, res) => {
  Todo
    .find({_creator: req.user._id})
    .then((todos) => {
      res.send({todos});
    }, (e) => {
      res
        .status(400)
        .send(e);
    });
});

app.get('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;
  // validateID(id)
  if (!ObjectID.isValid(id)) 
    return res
      .status(404)
      .send({Error: 'Invalid ID'});
  
  Todo
    .findOne({_id: id, _creator: req.user._id})
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

app.delete('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;
  // validateID(id)
  if (!ObjectID.isValid(id)) 
    return res
      .status(404)
      .send({Error: 'Invalid ID'});
  
  Todo
    .findOneAndRemove({_id: id, _creator: req.user._id})
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

app.patch('/todos/:id', authenticate, (req, res) => {
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
    .findOneAndUpdate({
      _id: id,
      _creator: req.user._id
    }, {
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

app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User
    .findByCredentials(body.email, body.password)
    .then((user) => {
      return user
        .generateAuthToken()
        .then((token) => {
          res
            .header('x-auth', token)
            .send(user);
        });
    })
    .catch((e) => {
      res
        .status(400)
        .send();
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req
    .user
    .removeToken(req.token)
    .then(() => {
      res
        .status(200)
        .send();
    })
    .catch((e) => {
      res
        .status(400)
        .send();
    });
});

app.listen(port, () => {
  console.log(`Server started... ${port}`);
});
