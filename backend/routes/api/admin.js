const Link = require("../../models/link");
const User = require("../../models/user");
const auth = require("../../middleware/adminauth");
const express = require("express");
const router = express.Router();

router.get("/users", auth, async (req, res) => {
  try {
    User.find()
      .sort({ date: -1 })
      .then((users) => res.json(users));
  } catch (err) {}
});

router.get("/users/:id", auth, async (req, res) => {
  try {
    User.findById(req.params.id)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(404).json({ success: false }));
  } catch (err) {}
});

router.delete("/users/del/:id", auth, async (req, res) => {
  try {
    User.findById(req.params.id)
      .then((user) => user.remove().then(() => res.json({ success: true })))
      .catch((err) => res.status(404).json({ success: false }));
  } catch (err) {}
});

router.get("/links", auth, async (req, res) => {
  //console.log(req.query);
  try {
    Link.find()
      .sort({ date: -1 })
      .limit(20)
      .then((links) => res.json(links));
  } catch (err) {}
});

router.get("/links/:id", auth, async (req, res) => {
  try {
    Link.findById(req.params.id)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(404).json({ success: false }));
  } catch (err) {}
});

router.post("/links/add", auth, async (req, res) => {
  try {
    switch (req.body.type.trim()) {
      case "New_Link": {
        const link = await Link.findOne({
          abbreviation: req.body.abbreviation,
        });
        if (link) {
          res.status(422).json({ message: "Link Already Exists" });
        } else {
          const newLink = new Link({
            name: req.body.name,
            abbreviation: req.body.abbreviation,
            link: req.body.link,
            logo: req.body.logo,
            categoryMain: req.body.categoryMain,
            categoryBase: req.body.categoryBase,
          });
          const newlink = await newLink.save();
          res.status(200).json(newlink);
        }
        break;
      }
      default: {
        res.json({ message: "Waiting" });
      }
    }
  } catch (err) {}
});

router.put("/links/update/:id", auth, async (req, res) => {
  try {
    switch (req.body.type) {
      case "New_Link": {
        //const data = req.body.data;
        // const result = await Link.updateOne(
        //   { _id: req.params.id },
        //   {
        //     $set: {
        //       categoryMain: data,
        //     },
        //   },
        //   { upsert: true }
        // );
        Link.findById(req.params.id).then((link) => {
          res.json(link);
        });
        break;
      }
      default: {
        res.json({ message: "Waiting" });
      }
    }
  } catch (err) {}
});

router.delete("/links/del/:id", auth, async (req, res) => {
  try {
    switch (req.body.type) {
      case "New_Link": {
        Link.findById(req.params.id)
          .then((link) => link.remove().then(() => res.json({ success: true })))
          .catch((err) => res.status(404).json({ success: false }));
        break;
      }
      default: {
        res.json({ message: "Waiting" });
      }
    }
  } catch (err) {}
});

module.exports = router;
