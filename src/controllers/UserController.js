const { getUsersData, deleteAcc } = require("../../dbsetup");

class UserController {
  // hiển thị bài viết
  show(req, res, next) {
    Promise.all([getUsersData()])
      .then(([allUsers]) => {
        res.json(allUsers);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  }

  // tạo ra bài viết mới
  create(req, res, next) {}

  // edit bài viết
  edit(req, res, next) {}

  // xóa bài viết (soft delete)
  delete(req, res, next) {
    const { user_id } = req.body;
    Promise.all([deleteAcc(user_id)])
      .then(([deletedUser]) => {
        res.json(deletedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  }
}

module.exports = new UserController();
