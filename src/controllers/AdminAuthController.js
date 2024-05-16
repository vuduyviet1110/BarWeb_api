const { getAllAdmins, getAllAdminById } = require("../../dbsetup");

class AdminAuthController {
  // tạo ra bài viết mới
  async Auth(req, res, next) {
    const { ad_name, ad_password } = req.body;

    try {
      const admins = await getAllAdmins();
      const admin = admins.find(
        (ad) => ad.admin_name === ad_name && ad.admin_password === ad_password
      );

      if (admin) {
        // Admin found, handle the success case
        res.status(200).json({ message: "Admin found", admin });
      } else {
        // Admin not found, handle the failure case
        res.send("Invalid");
      }
    } catch (error) {
      // Handle any errors that occurred during the operation
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async getAdmin(req, res, next) {
    const { ad_id } = req.params;
    console.log(ad_id);
    try {
      const admin = await getAllAdminById(ad_id);
      res.json({ id: admin[0].admin_id, name: admin[0].admin_name });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new AdminAuthController();
