const { body } = require('express-validator');
const User = require('../models/user');

exports.registerValidators = [
  body('email')
    .isEmail()
    .withMessage('Write correct email')
    .custom(async (value, { req }) => {
      try {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
          return Promise.reject('User already exists!');
        }
      } catch (e) {
        console.log(e);
      }
    })
    .normalizeEmail(),
  body('username')
    .isLength({ min: 6 })
    .withMessage('Username must be min 6 symbols')
    .trim(),
  body('password', 'Password should be min 6 and max 56 with alphabets')
    .isLength({ min: 6, max: 56 })
    .isAlphanumeric()
    .trim(),
  body('bio')
    .isLength({ min: 10 })
    .withMessage('Name must be min 10 symbols')
    .trim()
];

exports.loginValidators = [
  body('email')
    .isEmail()
    .withMessage('Write correct email')
    .normalizeEmail(),
  body('password', 'Password should be min 6 and max 56 with alphabets')
    .isLength({ min: 6, max: 56 })
    .trim()
];
