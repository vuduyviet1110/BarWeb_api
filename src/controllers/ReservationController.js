const { getUsersData } = require("../../dbsetup");

class BookingController {
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
  delete(req, res, next) {}
}

module.exports = new BookingController();
