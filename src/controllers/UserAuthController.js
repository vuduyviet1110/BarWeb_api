const { connection } = require("../../dbsetup");
class SinInController {
  // tạo ra bài viết mới
  Auth(req, res, next) {
    let gmail = req.body.email;
    let password = req.body.password;

    if (gmail && password) {
      connection.query(
        "SELECT * FROM users WHERE user_gmail = ? AND user_password = ?",
        [gmail, password],
        function (error, matched_users) {
          if (error) {
            throw error;
          }
          if (matched_users.length > 0) {
            // Lấy user_id của người dùng đầu tiên phù hợp
            const firstUser = matched_users[0];
            // Tạo cookie
            res.cookie("User_id", firstUser.user_id, {
              maxAge: 2 * 60 * 60 * 1000,
              httpOnly: true,
            });
            // Redirect đến trang của người dùng đầu tiên phù hợp
            // res.redirect("/id= " + firstUser.user_id);
            res.send("Có users và được vào");
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
}

module.exports = new SinInController();
