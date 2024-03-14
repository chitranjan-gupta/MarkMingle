const express = require("express");
const authenticate = require("../../middleware/authenticate");
const User = require("../../models/user");
const log = require("../../utils/log");
const router = express.Router();

router.post("/add", authenticate, async (req, res) => {
  try {
    if (req.body.catID) {
      const link = {
        url: req.body.url,
        type: req.body.type,
      };
      User.findOneAndUpdate(
        { _id: req.user.id, "categories._id": req.body.catID },
        {
          $push: {
            "categories.$.links": link,
          },
        },
        { "categories.$": 1 },
        (err) => {
          if (err) {
            log(err);
          } else {
            res.status(200).json({ message: "Saved" });
          }
        }
      );
    } else {
      User.findOne(
        { _id: req.user.id, "categories.name": "Uncategorised" },
        { "categories.$": 1 },
        (err, cat) => {
          if (err) {
            log(err);
            res.status(404).json({ message: "Not Found" });
          } else {
            if (!cat) {
              res.status(404).json({ message: "Not Found" });
            } else {
              const link = {
                url: req.body.url,
                type: req.body.type,
              };
              User.findOneAndUpdate(
                { _id: req.user.id, "categories._id": cat.categories[0]._id },
                {
                  $push: {
                    "categories.$.links": link,
                  },
                },
                { "categories.$": 1 },
                (err) => {
                  if (err) {
                    log(err);
                  } else {
                    res.status(200).json({ message: "Saved" });
                  }
                }
              );
            }
          }
        }
      );
    }
  } catch (err) {
    log(err);
  }
});

router.post("/get", authenticate, async (req, res) => {
  try {
    if (req.body.catID) {
      const user = await User.findOne(
        {
          _id: req.user.id,
          "categories._id": req.body.catID,
          "categories.links._id": req.body.linkID,
        },
        { "categories.links.$": 1 }
      );
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "Not Found" });
      }
      // User.findOne(
      //   {
      //     _id: req.user.id,
      //     "categories._id": req.body.catID,
      //     "categories.links._id": req.body.linkID,
      //   },
      //   { $elemMatch: { "categories._id": req.body.catID } },
      //   (err, link) => {
      //     if (err) {
      //       log(err);
      //       res.status(404).json({ message: "Not Found" });
      //     } else {
      //       if (link) {
      //         res.status(200).json(link);
      //       } else {
      //         res.status(404).json({ message: "Not Found" });
      //       }
      //     }
      //   }
      // );
    }
  } catch (err) {
    log(err);
  }
});
/*
router.post("/edit", authenticate, async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
});

router.post("/del", authenticate, async (req, res) => {
  try {
    Link.findById(req.body.id)
      .then((link) => link.remove().then(() => res.json({ success: true })))
      .catch((err) => {
        console.log(err);
        res.status(404).json({ success: false });
      });
  } catch (err) {
    console.log(err);
  }
});

router.post("/getAll", authenticate, async (req, res) => {
  try {
    Link.find().then((links) => {
      res.json(links);
    });
  } catch (err) {}
});
*/
module.exports = router;
