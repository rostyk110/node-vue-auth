const { Router } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { registerValidators } = require('../../utils/validators');
const User = require('../../models/user');
const router = Router();

// POST /users/signup
// body: { email, username, password, bio }
// returns: code: 201, res: { token: ‘Bearer sometoken’  }

router.post('/', registerValidators, async (req, res) => {
  try {
    const { email, username, password, bio } = req.body;

    const errors = validationResult(req);

    if (errors.errors.length) {
      res.status(400).json({
        title: 'error',
        error: errors.errors[0].msg
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      await User.create({
        email,
        username,
        password: hashPassword,
        bio
      });

      res.status(201).json({
        title: 'register success'
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

module.exports = router;
