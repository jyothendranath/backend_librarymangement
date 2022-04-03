const jwt = require('jsonwebtoken');
const { Router } = require('express');
const User = require('../models/user');

require('dotenv').config();

const router = Router();

router.post('/', async(req, res) => {
  const { username, password, isAdmin } = req.body
  if (!(username && password && isAdmin)) {
    res.status(400).json({ message: "All inputs are required" })
  }
  try {
    const user = await User.findOne({ username: username })
    if (user && password === user.password && isAdmin === user.isAdmin) {
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      res.token = token
      res.status(200).json(user);
    }
    res.status(400).json({ message: "Invalid Credentials" })
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router