const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { loginValidators } = require('../../utils/validators');
const keys = require('../../config/keys');
const User = require('../../models/user');
const router = Router();

// POST /users/login body: { email, password }
// body: { email, password }
// returns: code: 200, res: { token: ‘Bearer sometoken’  }

router.post('/', loginValidators, async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (errors.errors.length) {
      res.status(400).json({
        title: 'error',
        error: errors.errors[0].msg
      });
    }

    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);

      if (areSame) {
        const token = jwt.sign(
          {
            email: candidate.email,
            userId: candidate.id
          },
          keys.jwtSecret,
          { expiresIn: 15 * 60 }
        );

        res.status(200).json({
          id: candidate.id,
          title: 'login success',
          token: `Bearer ${token}`
        });
      } else {
        res.status(500).json({
          title: 'login failed',
          error: 'Invalid credentials'
        });
      }
    } else {
      res.status(401).json({
        title: 'user not found',
        error: 'Invalid credentials'
      });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
