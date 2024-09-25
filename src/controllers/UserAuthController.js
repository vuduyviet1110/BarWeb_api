const { getUserByEmail } = require("../../dbsetup");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const TokenManagement = require("../utils/token");

let refreshTokens = [];
class SinInController {
  // tạo ra bài viết mới
  async Auth(req, res, next) {
    let gmail = req.body.user_gmail;
    let password = req.body.user_password;

    if (gmail) {
      try {
        const matched_user = await getUserByEmail(gmail);
        if (matched_user) {
          const validPassword = await bcrypt.compare(
            password,
            matched_user.user_password
          );
          if (!validPassword) {
            res.json("wrong pwd");
          } else {
            const accessToken =
              TokenManagement.generateAccessToken(matched_user);
            const refreshToken =
              TokenManagement.generateRefreshToken(matched_user);

            refreshTokens.push(refreshToken);
            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: false,
              path: "/",
              sameSite: "strict",
            });
            res.status(200).json({ matched_user, accessToken, refreshToken });
          }
        } else {
          res.send("Incorrect Username and/or Password!");
        }
      } catch (error) {
        res.status(500).send(error);
      }
    } else {
      res.send("Please enter Username and Password!");
    }
  }

  // Bình thường thì dùng redis để lưu trữ refresh token?
  requestRefreshToken(req, res, next) {
    try {
      //Take refresh token from user
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.status(401).json("not authenticated");
      jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
        if (err) {
          console.log(err);
        }
        refreshTokens = refreshToken.filter((token) => token !== refreshToken);
        const newAccessToken = TokenManagement.generateAccessToken(user);
        const newRefreshToken = TokenManagement.generateRefreshToken(user);

        refreshTokens.push(newRefreshToken);
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json({ accessToken: newAccessToken });
      });
    } catch (error) {
      console.error(error);
    }
  }

  userLogout(req, res) {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("Logged out");
  }
}

module.exports = new SinInController();
