class ProfileUserController {
  // hiển thị bài viết
  show(req, res, next) {
    const userId = req.params.id;

    res.send("hello " + userId);
  }

  // tạo ra bài viết mới
  create(req, res, next) {}

  // edit bài viết
  edit(req, res, next) {}

  // xóa bài viết (soft delete)
  delete(req, res, next) {}
}

module.exports = new ProfileUserController();
