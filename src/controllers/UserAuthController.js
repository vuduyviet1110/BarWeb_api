const { connection } = require("../../dbsetup");
const jwt = require("jsonwebtoken");
class SinInController {
  // tạo ra bài viết mới
  Auth(req, res, next) {
    let gmail = req.body.user_gmail;
    let password = req.body.user_password;

    if (gmail && password) {
      connection.query(
        "SELECT * FROM users WHERE user_gmail = ? AND user_password = ?",
        [gmail, password],
        function (error, matched_users) {
          if (error) {
            throw error;
          }
          if (matched_users.length > 0) {
            //Lấy user_id của người dùng đầu tiên phù hợp
            const data = matched_users[0];
            var token = jwt.sign({ user_id: data.user_id }, "mk");
            return res.json({
              msg: "Success",
              token: token,
              data: data,
            });
          } else {
            res.send("Incorrect Username and/or Password!");
          }
          res.end();
        }
      );
    } else {
      res.send("Please enter Username and Password!");
      res.end();
    }
  }
  private(req, res, next) {
    try {
      var token = req.params.token;
      var result = jwt.verify(token, "mk");
      res.send(result);
      if (result) {
        next();
      }
    } catch (error) {
      return res.redirect("/");
    }

    // Nếu xác thực thành công, tiếp tục sang middleware hoặc handler tiếp theo
  }

  // Handler trả về dữ liệu sau khi xác thực thành công
  welcome(req, res, next) {
    res.json({ message: "Welcome" });
  }
}

module.exports = new SinInController();
