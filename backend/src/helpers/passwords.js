const bcrypt = require('bcrypt');

const comparePasswords = (password, encrypted) =>
  bcrypt.compareSync(password, encrypted);

const encryptPassword = (password) => bcrypt.hashSync(password, 10);

module.exports={
    comparePasswords,
    encryptPassword,
}