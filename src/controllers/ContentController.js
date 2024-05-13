const { ModifyTitleContent, getTitleContent } = require("../../dbsetup");

class ContentController {
  // hiển thị bài viết
  async show(req, res, next) {
    try {
      const result = await getTitleContent();
      console.log("đang lấy dữ liệu...");
      return res.status(200).json(result);
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).json("something wrong");
    }
  }

  // tạo ra bài viết mới
  async create(req, res) {
    try {
      const { title, content, image } = req.body;
      const fileData = req.file;
      console.log(
        "file:",
        fileData,
        " title: ",
        title,
        " content: ",
        content,
        " image: ",
        image
      );
      const getAllTitleContent = await getTitleContent();
      const currentImg = getAllTitleContent[0].image;
      console.log("currentImg:", currentImg);
      if (title && content && (fileData || image)) {
        if (currentImg === image) {
          res.send("same image");
          await ModifyTitleContent(1, content, title, image);
        } else {
          await ModifyTitleContent(1, content, title, fileData.path);
          // console.log("file: ", fileData?.path, "image: ", image);
          return res.status(200).json({ file: fileData?.path });
        }
      } else {
        // res.json("leave blank?");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // edit bài viết
  edit(req, res, next) {}

  // xóa bài viết (soft delete)
  delete(req, res, next) {}
}

module.exports = new ContentController();
