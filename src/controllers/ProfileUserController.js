const {
  updateUserData,
  EmailExistedApartFromCurrentUser,
} = require("../../dbsetup");
const bcrypt = require("bcrypt");

class ProfileUserController {
  // hiển thị bài viết
  show(req, res, next) {
    const userId = req.params.id;
    getUserById(userId)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(500).json({ error: "An error occurred" });
      });
  }

  // edit bài viết
  async edit(req, res, next) {
    const {
      user_name,
      user_gmail,
      user_password,
      user_DOB,
      user_phone,
      user_id,
    } = req.body;
    if ((user_name, user_gmail, user_password, user_DOB, user_phone, user_id)) {
      const ExistedEmail = await EmailExistedApartFromCurrentUser(
        user_gmail,
        user_id
      );
      if (ExistedEmail > 0) {
        res.send("existed email");
      } else {
        // Hash the password with the generated salt
        updateUserData(
          user_name,
          user_gmail,
          user_password,
          user_DOB,
          user_phone,
          user_id
        )
          .then(() => {
            res.send("success");
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "An error occurred" });
          });
      }
    }
  }

  // xóa bài viết (soft delete)
  delete(req, res, next) {
    const user_id = req.params.id;
    deleteAcc(user_id)
      .then((data) => {
        res.send(`delete account with the user id ${user_id} successfully`);
      })
      .catch((error) => {
        res.status(500).json({ error: "An error occurred" });
        console.log(error);
      });
  }
}
module.exports = new ProfileUserController();
