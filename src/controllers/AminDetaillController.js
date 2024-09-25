const {
  getGiftCardOrderById,
  getUserById,
  getBookingById,
} = require("../../dbsetup");

class AdminDetailController {
  // tạo ra bài viết mới
  showDetails(req, res) {
    const { id, field } = req.params;
    if (!field || !id) res.status(400).json({ error: "Missing field" });
    console.log(id, field);
    if (field === "giftcard" && id) {
      getGiftCardOrderById(id)
        .then((result) => {
          res.status(200).json({ giftcard: result });
        })
        .catch((error) => {
          res.status(500).json({ error: "error on fetching giftcard detail" });
        });
    } else if (field === "reservation" && id) {
      getBookingById(id)
        .then((result) => {
          res.status(200).json({ reservation: result });
        })
        .catch((error) => {
          res
            .status(500)
            .json({ error: "error on fetching reservation detail" });
        });
    } else if (field === "user" && id) {
      getUserById(id)
        .then((result) => {
          res.status(200).send({ user: result });
        })
        .catch((error) => {
          res.status(500).json({ error: "error on fetching user detail" });
        });
    } else {
      res.status(400).json({ error: "Missing  or incorrect field" });
    }
  }
  updateDetails(req, res) {
    const id = req.params.id;

    // getGiftCardOrderById
    getGiftCardOrderById(id)
      .then((order) => {
        res.send(order);
      })
      .catch((error) => {
        res.status(500).json({ error: "An error occurred" });
      });
  }
  deleteDetails(req, res) {
    const id = req.params.id;

    // getGiftCardOrderById
    getGiftCardOrderById(id)
      .then((order) => {
        res.send(order);
      })
      .catch((error) => {
        res.status(500).json({ error: "An error occurred" });
      });
  }
}

module.exports = new AdminDetailController();
