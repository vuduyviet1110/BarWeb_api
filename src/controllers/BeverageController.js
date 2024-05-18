const { getBeverage, ModifyBeverage } = require("../../dbsetup");

class EventController {
  // hiển thị bài viết
  async show(req, res, next) {
    try {
      const result = await getBeverage();
      return res.status(200).json(result);
    } catch (error) {
      console.log("error: ", error);
      return res.status(500).json("something wrong");
    }
  }

  // edit bài viết
  async edit(req, res, next) {
    try {
      const {admin_id, name, description, price, image, bev_id} = req.body;
      const fileData = req.file;

      if (
        !admin_id ||
        !name ||
        !description ||
        !price ||
        !bev_id ||
        (!fileData && !image)
      ) {
        return res.json({ error: "all fields" });
      }

      // Update the event with new details
      await ModifyBeverage(
        admin_id,
        name,
        description,
        price,
        fileData?.path || image,
        bev_id
      );

      // Respond with the path of the new image if uploaded, else with the old image
      return res.status(200).send("success");
    } catch (error) {
      console.error(error);
      next(error); // Pass the error to the error-handling middleware
    }
  }
}

module.exports = new BeverageController();
