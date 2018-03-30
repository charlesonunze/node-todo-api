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

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

const resultHash = SHA256(JSON.stringify(token.data) + salt).toString();

if (resultHash === token.hash) 
  console.log(`We're good!`);
else 
  console.log(`We're not good!`);
