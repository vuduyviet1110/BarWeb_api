const { connection, UpdatePassword } = require("../../dbsetup");
class ContentController {
  // hiển thị bài viết
  changePassword(req, res, next) {
    const { password, id } = req.body;
    if (password && id) {
      connection.query(
        "SELECT * FROM users WHERE user_id= ?",
        [id],
        function (error, matched_users) {
          if (error) {
            throw error;
          }
          if (matched_users.length > 0) {
            //Lấy user_id của người dùng đầu tiên phù hợp
            UpdatePassword(matched_users[0].user_id, password)
              .then((result) => {
                // newUser là  kết quả xử lý của hàm setUserData
                if (result) {
                  res.json(matched_users);
                } else {
                  res.send("Update Password faild!");
                }
              })
              .catch((err) => {
                console.error(err);
                res.send("Internal Server Error");
              });
          } else {
            res.send("Can not find matched users");
          }
        }
      );
    } else {
      res.send("Please enter Username and Password!");
      res.end();
    }
    // Xử lý logic thay đổi mật khẩu ở đây
  }
}

module.exports = new ContentController();
