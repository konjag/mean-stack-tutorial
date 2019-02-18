const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true
  }
});

UserSchema.methods.setPassword = function (password) {
  this.hash = bcrypt.hashSync(password, 10);
}

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.hash);
}

UserSchema.methods.generateJwt = function () {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000)
  }, 'TheBestKeptSecret');
}

const User = mongoose.model('User', UserSchema);

module.exports = User;
