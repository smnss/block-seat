const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    next();
  }
  const token = authHeader.split(" ")[1]; // 'Bearer dfdfdiklsjdf'
  if (!token) {
    req.isAuth = false;
    next();
  }
  let decodedToken;
  try {
  decodedToken = jwt.verify(token, 'somesecretkey');
  } catch(err) {
    req.isAuth = false;
    next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
