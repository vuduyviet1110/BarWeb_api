const { setBookingData } = require("../../dbsetup");

class ReservationUserController {
  // tạo ra bài viết mới
  create(req, res, next) {
    // lấy body từ form của client gửi lên
    const { user_id, table_date, table_time, number_people, message } =
      req.body;
    setBookingData(user_id, table_date, table_time, number_people, message)
      .then((newReservation) => {
        if (newReservation) {
          res.json(newReservation);
        } else {
          res.send("Something broken!");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  }
}

module.exports = new ReservationUserController();
