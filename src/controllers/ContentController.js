class ContentController {
  // hiển thị bài viết
  show(req, res, next) {
    res.send("hello");
  }

  // tạo ra bài viết mới
  create(req, res, next) {}

  // edit bài viết
  edit(req, res, next) {}

  // xóa bài viết (soft delete)
  delete(req, res, next) {}
}

module.exports = new ContentController();
