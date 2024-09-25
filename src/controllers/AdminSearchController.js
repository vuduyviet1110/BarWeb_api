const { searchInDatabase } = require("../../dbsetup");
class AdminSearchController {
  // tạo ra bài viết mới
  async search(req, res, next) {
    const field = req.query.field;
    const keyword = req.query.keyword;

    if (!field || !keyword) {
      return res.status(400).json({ error: "Missing field or keyword" });
    }

    // Gọi hàm tìm kiếm
    searchInDatabase(field, keyword)
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("An error occurred");
      });
  }
}

module.exports = new AdminSearchController();
