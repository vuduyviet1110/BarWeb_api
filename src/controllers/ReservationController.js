const {
  getBookingData,
  deleteReservation,
  updateBookingData,
  setBookingData,
} = require("../../dbsetup");

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
  create(req, res, next) {
    const { user_id, table_date, table_time, number_people, message } =
      req.body.newReservation;
    console.log(user_id, table_date, table_time, number_people);
    setBookingData(user_id, table_date, table_time, number_people, message)
      .then((data) => {
        res.send("insert success on reservation of user:");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
      });
  }

  edit(req, res, next) {
    const { reservation_id, table_date, table_time, number_people, message } =
      req.body.MatchedReservation;
    console.log(table_date, table_time, number_people, message);
    updateBookingData(
      reservation_id,
      table_date,
      table_time,
      number_people,
      message
    )
      .then((data) => {
        res.send(`Update success on reservation of user:  ${reservation_id}`);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "An error occurred" });
      });
  }

  // xóa bài viết (soft delete)
  delete(req, res, next) {
    const { reservation_id } = req.body;
    deleteReservation(reservation_id)
      .then((data) => {
        res.send(`Deleted: ${reservation_id}`);
      })
      .catch((error) => {
        res.status(500).json({ error: "An error occurred" });
        console.log(error);
      });
  }
}

module.exports = new BookingController();
