const jwt = require('jsonwebtoken');

const data = {
  id: 1
};

const salt = 'hash-salt';

const token = jwt.sign(data, salt);

console.log(`
  ${token}
  ${typeof token}
`);

const decodedToken = jwt.verify(token, salt);

console.log(decodedToken);
