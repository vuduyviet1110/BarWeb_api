const {
  ModifyTitleContent,
  getTitleContent,
  getOurStory,
  ModifyOurStory,
} = require("../../dbsetup");

class ContentController {
  // hiển thị title
  async showTitle(req, res, next) {
    try {
      const result = await getTitleContent();
      return res.status(200).json(result);
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).json("something wrong");
    }
  }
  // hiển thị ourstory
  async showOurstory(req, res, next) {
    try {
      const result = await getOurStory();
      return res.status(200).json(result);
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).json("something wrong");
    }
  }

  // edit title trong phần content
  async editTitle(req, res) {
    try {
      const { title, content, image, ad_id } = req.body;
      const fileData = req.file;
      const getAllTitleContent = await getTitleContent();
      const currentImg = getAllTitleContent[0].image;
      if (title && content && (fileData || image)) {
        if (currentImg === image) {
          res.send("same image");
          await ModifyTitleContent(ad_id, content, title, image);
        } else {
          await ModifyTitleContent(ad_id, content, title, fileData.path);
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

  // edit our story trong phần content
  async editOurStory(req, res, next) {
    try {
      const { title, content, storyBgImage, storySlideImage, ad_id } = req.body;
      const bgImage = req.files.storyBgImage ? req.files.storyBgImage[0] : null;
      const slideImage = req.files.storySlideImage
        ? req.files.storySlideImage[0]
        : null;

      if (
        title &&
        content &&
        (bgImage || storyBgImage) &&
        (slideImage || storySlideImage)
      ) {
        await ModifyOurStory(
          ad_id,
          content,
          title,
          bgImage?.path || storyBgImage,
          slideImage?.path || storySlideImage
        );
        res.send("dbs updated!");
      } else {
        res.send("complete all the fields");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new ContentController();
