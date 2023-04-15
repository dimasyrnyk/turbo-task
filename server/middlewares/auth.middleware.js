const tokenService = require("../services/token.service");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: "Немає авторизації" });
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ message: "Немає авторизації" });
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return res.status(401).json({ message: "Немає авторизації" });
    }

    req.user = userData;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Немає авторизації" });
  }
};
