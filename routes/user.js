const { Router } = require('express');
const User = require('../models/user');
const passport = require('passport');
const router = Router();

// GET /users/${id} (returns not secured data for provided user id)
// returns: code: 200, res: { email, username, password, bio }

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const user = await User.findOne({ where: { id: req.params.id } });
      res.status(200).json(user);
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: 'Server error'
      });
    }
  }
);

module.exports = router;
