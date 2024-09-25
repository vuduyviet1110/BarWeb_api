const { getEvents, ModifyEvents } = require("../../dbsetup");

class EventController {
  // hiển thị bài viết
  async show(req, res, next) {
    try {
      const result = await getEvents();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json("something wrong");
    }
  }

  // edit bài viết
  async edit(req, res, next) {
    try {
      const { content, title, event_id, image, admin_id } = req.body;
      const fileData = req.file;

      if (
        !event_id ||
        !title ||
        !content ||
        !admin_id ||
        (!fileData && !image)
      ) {
        return res.json({ error: "all fields" });
      }

      // Update the event with new details
      await ModifyEvents(
        admin_id,
        content,
        title,
        fileData?.path || image,
        event_id
      );

      // Respond with the path of the new image if uploaded, else with the old image
      return res.status(200).send("success");
    } catch (error) {
      console.error(error);
      next(error); // Pass the error to the error-handling middleware
    }
  }
}

module.exports = new EventController();
