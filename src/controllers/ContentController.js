class ContentController {
  // hiển thị bài viết
  show(req, res, next) {}

  // tạo ra bài viết mới
  create(req, res, next) {}

  // edit bài viết

  edit(req, res, next) {}

  // xóa bài viết (soft delete)
  delete(req, res, next) {}

  // xóa hẳn khỏi database
  hardDelete(req, res, next) {}

  // nếu xóa soft thì restore khi cần
  restore(req, res, next) {}
}

module.exports = new ContentController();
