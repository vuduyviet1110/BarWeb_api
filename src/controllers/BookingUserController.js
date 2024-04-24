const {
  setBookingData,
  setUserNoAccData,
  getUserNoAccByMail,
} = require("../../dbsetup");

class ReservationUserController {
  // tạo ra bài viết mới
  create(req, res, next) {
    // lấy body từ form của client gửi lên
    const {
      user_id,
      table_date,
      table_time,
      number_people,
      message,
      user_name,
      user_phone,
      user_gmail,
    } = req.body;
    const date = table_date.split("T")[0];
    if (user_id != 0) {
      setBookingData(
        user_id,
        table_date,
        table_time,
        number_people,
        user_gmail,
        user_phone,
        user_name,
        message
      )
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
    } else {
      let guest_id; // Declare the guest_id variable outside the promise chain
      setUserNoAccData(user_name, user_email, user_phone)
        .then(() => getUserNoAccByMail(user_email))
        .then((result) => {
          console.log(result);
          guest_id = result; // Assign the resolved value to guest_id
          const { table_date, table_time, number_people, message } = req.body;
          return setBookingData(
            user_id,
            table_date,
            table_time,
            number_people,
            user_email,
            user_phone,
            user_name,
            message,
            guest_id
          );
        })
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
}

module.exports = new ReservationUserController();
