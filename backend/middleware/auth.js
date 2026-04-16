const User = require("../models/user");

// simple auth middleware
const auth = async (req, res, next) => {
  try {
    const { email } = req.headers;

    if (!email) {
      return res.status(401).json({ message: "No user email provided" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// role-based access
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = { auth, authorize };