const {
  getBookingData,
  deleteReservation,
  updateBookingData,
  setBookingData,
  getUserByEmail,
  getUserNoAccByMail,
  EmailExisted,
  setUserNoAccData,
} = require("../../dbsetup");

class BookingController {
  // hiển thị bài viết
  async show(req, res, next) {
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
  async create(req, res, next) {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          user_name,
          user_gmail,
          user_phone,
          table_date,
          table_time,
          number_people,
          message,
        } = req.body.newReservation;
        let guest_id;

        const noteExistedEmail = await EmailExisted(user_gmail);
        if (noteExistedEmail === 0) {
          console.log("chưa tồn tại");
          await setUserNoAccData(user_name, user_gmail, user_phone);
          const guests = await getUserNoAccByMail(user_gmail);
          guest_id = guests[0]?.guest_id;
          setBookingData(
            1,
            table_date,
            table_time,
            number_people,
            message,
            guest_id
          );
        } else {
          guest_id = 1;
          console.log("đã tồn tại");
          const user = await getUserByEmail(user_gmail);
          const user_id = user.user_id; // Assign the correct value received from getUserByEmail
          setBookingData(
            user_id,
            table_date,
            table_time,
            number_people,
            message,
            guest_id
          );
        }

        resolve();
      } catch (error) {
        reject(error);
      }
    })
      .then(() => {
        res.status(200).json({ message: "Booking created successfully" });
      })
      .catch((error) => {
        console.error("Error creating booking:", error);
        res
          .status(500)
          .json({ error: "An error occurred while creating the booking" });
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
        res.send(`success:  ${reservation_id}`);
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
