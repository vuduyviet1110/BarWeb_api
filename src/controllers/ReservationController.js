const { getBookingData } = require("../../dbsetup");

class BookingController {
  // hiển thị bài viết
  show(req, res, next) {
    Promise.all([getBookingData()])
      .then(([allReservation]) => {
        res.json(allReservation);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  }

  // tạo ra bài viết mới
  create(req, res, next) {}

  edit(req, res, next) {
    const { user_id, table_date, table_time, number_people, message } =
      req.body;

    updateBookingData(user_id, table_date, table_time, number_people, message)
      .then(() => {
        res.send(`Update success on reservation of user:  ${user_id}`);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
      });
  }

  // xóa bài viết (soft delete)
  delete(req, res, next) {
    const user_id = req.params.id;
    deleteReservation(user_id)
      .then((data) => {
        res.send(`delete Reservation with the user id ${user_id} successfully`);
      })
      .catch((error) => {
        res.status(500).json({ error: "An error occurred" });
        console.log(error);
      });
  }
}

module.exports = new BookingController();
