const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({
        username: args.userInput.username
      });
      if (existingUser) {
        throw new Error("Username already Exist");
      }
      const hasedpassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        username: args.userInput.username,
        password: hasedpassword
      });
      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ username, password }) => {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error("User does not exist!");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password incorrect!");
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      "somesecretkey",
      { expiresIn: "1h" }
    );
    return {
      userId: user.id,
      token: `Bearer ${token}`,
      tokenExpiration: 1
    };
  }
};
