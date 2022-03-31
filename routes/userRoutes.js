const { Router } = require("express");
const User = require("../models/user");

const router = Router();

// get collection
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create individual
router.post("/", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get individual
router.get("/:id", getUserById, (req, res) => {
  res.status(200).json(res.user);
});

// update individual
router.patch("/:id", getUserById, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.isAdmin != null) {
    res.user.isAdmin = req.body.isAdmin;
  }
  try {
    const updatedUser = await res.user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete individual
router.delete("/:id", getUserById, async (req, res) => {
  try {
    await res.user.remove();
    res.status(200).json({ message: "deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getUserById(req, res, nxt) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(400).json({ message: "user does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.user = user;
  nxt();
}

module.exports = router;
