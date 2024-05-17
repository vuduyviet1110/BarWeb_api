const {
  getEvents,
  ModifyEvents,
} = require("../../dbsetup");

class EventController {
  // hiển thị bài viết
  async show(req, res, next) {
    try {
      const result = await getEvents();
      return res.status(200).json(result);
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).json("something wrong");
    }
  }

  // edit bài viết
  async edit(req, res, next) {
    try {
      const {event_id, title, description, image, ad_id } = req.body;
      const fileData = req.file;
      const getAllEvents = await getEvents();
      const currentImg = getAllEvents[event_id-1].image;
      if (title && content && (fileData || image)) {
        if (currentImg === image) {
          res.send("same image");
          await ModifyEvents(admin_id, description, title, image);
        } else {
          await ModifyEvents(aadmin_id, description, title, fileData.path);
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
}

module.exports = new EventController();
