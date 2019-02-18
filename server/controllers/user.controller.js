const passport = require('passport');
const User = require('../models/user.model');

exports.create = function (req, res) {
  const user = new User({
    email: req.body.data.email,
    name: req.body.data.name
  });

  user.setPassword(req.body.data.password);

  user.save()
    .then(function (createdUser) {
      return res.status(200).json({
        status: 200,
        data: createdUser,
        message: 'Success'
      });
    })
    .catch(function (err) {
      return res.status(400).json({
        status: 400,
        message: err.message
      });
    });
}

exports.login = function (req, res) {
  console.log('login');

  passport.authenticate('local', function(err, user, info) {
    console.log('auth');
    if (err) {
      return res.status(400).json({
        status: 400,
        message: err
      });
    }

    if (!user) {
      return res.status(400).json({
        status: 400,
        message: info
      });
    }

    return res.status(200).json({
      status: 200,
      data: user
    });
  })(req, res);
}
