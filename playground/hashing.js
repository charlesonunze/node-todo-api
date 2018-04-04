const {SHA256} = require('crypto-js');

let msg = 'my password';
let hash = SHA256(msg).toString();

console.log(`
  ${msg}
  ${hash}
`);

const data = {
  id: 1
};

const salt = 'hash-salt';

const token = {
  data,
  hash: SHA256(JSON.stringify(data) + salt).toString()
}

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

const resultHash = SHA256(JSON.stringify(token.data) + salt).toString();

if (resultHash === token.hash) 
  console.log(`We're good!`);
else 
  console.log(`We're not good!`);

// BCRYPTJS
const bcrypt = require('bcryptjs');

let password = 'abc123!';
let hashed = '$2a$10$ZKd.gT0OjcFDti2MRj4IVOA6ECK4R.pXhAOYLmJRjtqyzULxLYM9K';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {})
});

bcrypt.compare(password, hashed, (err, res) => {
  console.log(res);
});
