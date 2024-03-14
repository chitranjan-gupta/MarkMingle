const bcrypt = require("bcryptjs");
const authenticate = require("../../middleware/authenticate");
const User = require("../../models/user");
const express = require("express");
const log = require("../../utils/log");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = await User.findOne(
      { email: req.body.email },
      { _id: 1, name: 1, email: 1 }
    );
    if (user) {
      res.status(422).json({ message: "Email Already Exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      await newUser.save();
      res.json({ message: "Registered" });
    }
  } catch (err) {
    log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Empty" });
    }
    const userLogin = await User.findOne(
      { email: email },
      { _id: 1, name: 1, email: 1, password: 1 }
    );
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Password" });
      } else {
        token = await userLogin.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25252525),
          httpOnly: true,
        });
        res.status(200).json({ message: "User Signin successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Username" });
    }
  } catch (err) {
    log(err);
  }
});

router.post("/check", authenticate, async (req, res) => {
  try {
    res.status(200).json({ message: "Success" });
  } catch (err) {
    log(err);
  }
});

router.post("/change", authenticate, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      { password: await bcrypt.hash(req.body.password, 12) }
    );
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    log(err);
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    User.findById(req.params.id)
      .then((user) => user.remove().then(() => res.json({ success: true })))
      .catch((err) => res.status(404).json({ success: false }));
  } catch (err) {}
});

router.post("/user", authenticate, async (req, res) => {
  try {
    User.findOne({ _id: req.user.id }).then((user) => {
      res.json(user);
    });
  } catch (err) {}
});

router.post("/signout", authenticate, async (req, res) => {
  try {
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("User Logout");
  } catch (err) {}
});

module.exports = router;
