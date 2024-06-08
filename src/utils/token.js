const jwt = require("jsonwebtoken");
class TokenManagement {
  generateAccessToken(user) {
    return jwt.sign({ user_id: user.user_id }, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: "80s",
    });
  }

  generateRefreshToken(user) {
    return jwt.sign({ user_id: user.user_id }, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: "365d",
    });
  }
}
module.exports = new TokenManagement();
