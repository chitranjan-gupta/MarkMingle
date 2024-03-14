const express = require("express");
const authenticate = require("../../middleware/authenticate");
const User = require("../../models/user");
const log = require("../../utils/log");
const router = express.Router();

router.post("/getAll", authenticate, async (req, res) => {
  try {
    User.findOne(
      { _id: req.user.id },
      {
        "categories._id": 1,
        "categories.sub": 1,
        "categories.name": 1,
      }
    )
      .where("categories.sub")
      .equals(false)
      .exec((err, user) => {
        if (err) {
          res.status(404).json({ message: "Not Found" });
        } else {
          if (user) {
            res.status(200).json(user.categories);
          } else {
            res.status(404).json({ message: "Not Found" });
          }
        }
      });
  } catch (err) {
    log(err);
  }
});

router.post("/add", authenticate, async (req, res) => {
  try {
    const category = {
      name: req.body.name,
    };
    User.updateOne(
      { _id: req.user.id },
      { $push: { categories: category } },
      (err) => {
        if (err) {
          log(err);
        } else {
          res.status(200).json({ message: "Saved" });
        }
      }
    );
  } catch (err) {
    log(err);
  }
});

router.post("/get", authenticate, async (req, res) => {
  try {
    if (req.body.catID) {
      User.findOne(
        { _id: req.user.id, "categories._id": req.body.catID },
        {
          "categories.$": 1,
        },
        (err, cat) => {
          if (err) {
            log(err);
            res.status(404).json({ message: "Not Found" });
          } else {
            if (!cat) {
              res.status(404).json({ message: "Not Found" });
            } else {
              res.status(200).json(cat.categories[0]);
            }
          }
        }
      );
    }
  } catch (err) {
    log(err);
  }
});

router.post("/getLinks", authenticate, async (req, res) => {
  try {
    if (req.body.catID) {
      User.findOne(
        { _id: req.user.id, "categories._id": req.body.catID },
        { "categories.$": 1 },
        (err, cat) => {
          if (err) {
            log(err);
            res.status(404).json({ message: "Not Found" });
          } else {
            if (!cat) {
              res.status(404).json({ message: "Not Found" });
            } else {
              res.status(200).json(cat.categories[0].links);
            }
          }
        }
      );
    }
  } catch (err) {
    log(err);
  }
});

router.post("/sub", authenticate, async (req, res) => {
  try {
    User.findOne(
      { _id: req.user.id, "categories._id": req.body.catID },
      { "categories.$": 1 },
      (err, cat) => {
        if (err) {
          log(err);
          res.status(404).json({ message: "Not Found" });
        } else {
          if (!cat) {
            res.status(404).json({ message: "Not Found" });
          } else {
            res.status(200).json(cat.categories[0].subcategory);
          }
        }
      }
    );
  } catch (err) {
    log(err);
  }
});

router.post("/edit", authenticate, async (req, res) => {
  try {
    if (req.body.catID) {
    }
  } catch (err) {
    log(err);
  }
});

router.post("/del", authenticate, async (req, res) => {
  try {
    if (req.body.catID) {
    }
  } catch (err) {
    log(err);
  }
});

router.post("/addSub", authenticate, async (req, res) => {
  try {
    if (req.body.catID) {
      const category = {
        name: req.body.name,
        sub: true,
      };
      User.updateOne(
        { _id: req.user.id },
        { $push: { categories: category } },
        (err) => {
          if (err) {
            log(err);
          } else {
            User.findOne(
              { _id: req.user.id, "categories.name": req.body.name },
              { "categories.$": 1 },
              (err, cat) => {
                if (err) {
                  log(err);
                  res.status(404).json({ message: "Not Found" });
                } else {
                  if (!cat) {
                    res.status(404).json({ message: "Not Found" });
                  } else {
                    User.findOneAndUpdate(
                      { _id: req.user.id, "categories._id": req.body.catID },
                      {
                        $push: {
                          "categories.$.subcategory": cat.categories[0]._id,
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
        }
      );
    }
  } catch (err) {
    log(err);
  }
});

module.exports = router;
