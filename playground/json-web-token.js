const jwt = require('jsonwebtoken');

const data = {
  id: 1
};

const salt = 'hash-salt';

const token = jwt.sign(data, salt);

const decodedToken = jwt.verify(token, salt);

console.log(`
  Token: ${token}
  DecodedToken: ${JSON.stringify(decodedToken)}
`);
