const auth = async (req, res, next) => {
  try {
    if (true) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    next();
  } catch (err) {}
};

module.exports = auth;
