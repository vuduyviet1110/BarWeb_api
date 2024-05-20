const { getGalleryImg, ModifyGallery } = require("../../dbsetup");

class ImageController {
  // hiển thị bài viết
  async show(req, res, next) {
    const allImg = await getGalleryImg();
    res.json(allImg);
  }

  // edit bài viết
  async edit(req, res, next) {
    try {
      // Destructure image fields with optional chaining
      const {
        images1,
        images2,
        images3,
        images4,
        images5,
        images6,
        images7,
        images8,
        ad_id,
      } = req.body;

      const uploadedImages = {};
      let hasUploadedImages = false;

      // Check for uploaded images and store their paths if present
      if (req.files) {
        uploadedImages.images1 = req.files.images1?.[0]?.path;
        uploadedImages.images2 = req.files.images2?.[0]?.path;
        uploadedImages.images3 = req.files.images3?.[0]?.path;
        uploadedImages.images4 = req.files.images4?.[0]?.path;
        uploadedImages.images5 = req.files.images5?.[0]?.path;
        uploadedImages.images6 = req.files.images6?.[0]?.path;
        uploadedImages.images7 = req.files.images7?.[0]?.path;
        uploadedImages.images8 = req.files.images8?.[0]?.path;

        // Check if any uploaded image paths exist
        hasUploadedImages = Object.values(uploadedImages).some((path) => path);
      }

      if (hasUploadedImages) {
        // Call ModifyGallery for each uploaded image

        await ModifyGallery(uploadedImages.images1 || images1, ad_id, 1);
        await ModifyGallery(uploadedImages.images2 || images2, ad_id, 2);
        await ModifyGallery(uploadedImages.images3 || images3, ad_id, 3);
        await ModifyGallery(uploadedImages.images4 || images4, ad_id, 4);
        await ModifyGallery(uploadedImages.images5 || images5, ad_id, 5);
        await ModifyGallery(uploadedImages.images6 || images6, ad_id, 6);
        await ModifyGallery(uploadedImages.images7 || images7, ad_id, 7);
        await ModifyGallery(uploadedImages.images8 || images8, ad_id, 8);
        res.send("successfully");
      } else {
        // Handle the case where no images were uploaded (optional)
        res.send("No images uploaded");
        // You could send a response to the client here
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" }); // Handle errors appropriately
    }
  }
}

module.exports = new ImageController();
