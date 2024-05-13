const { updateUserData } = require("../../dbsetup");
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
  edit(req, res, next) {
    const {
      user_name,
      user_gmail,
      user_password,
      user_DOB,
      user_phone,
      user_id,
    } = req.body;

    updateUserData(
      user_name,
      user_gmail,
      user_password,
      user_DOB,
      user_phone,
      user_id
    )
      .then(() => {
        res.send(`Update success on user ${user_id}`);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
      });
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
