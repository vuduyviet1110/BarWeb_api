const { connection, UpdatePassword, getUserById } = require("../../dbsetup");
const bcrypt = require("bcrypt");
class ContentController {
  // hiển thị bài viết
  async changePassword(req, res, next) {
    const { newpwd, oldpwd, user_id } = req.body;
    const matched_user = await getUserById(user_id);
    if (newpwd && oldpwd && user_id) {
      const validPassword = await bcrypt.compare(
        oldpwd,
        matched_user.user_password
      );
      if (validPassword) {
        const saltRounds = 10; // Adjust this value as needed (higher = stronger)
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password with the generated salt
        const hash = await bcrypt.hash(newpwd, salt);

        connection.query(
          "SELECT * FROM users WHERE user_id= ?",
          [user_id],
          function (error, matched_users) {
            if (error) {
              throw error;
            }
            if (matched_users.length > 0) {
              //Lấy user_id của người dùng đầu tiên phù hợp
              UpdatePassword(matched_users[0].user_id, hash)
                .then((result) => {
                  // newUser là  kết quả xử lý của hàm setUserData
                  if (result) {
                    res.json("success");
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
        res.send("wrong old pwd");
      }
    } else {
      res.send("Please enter Username and Password!");
    }
    // Xử lý logic thay đổi mật khẩu ở đây
  }
}

module.exports = new ContentController();
