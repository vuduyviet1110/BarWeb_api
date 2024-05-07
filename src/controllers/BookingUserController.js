const {
  setBookingData,
  setUserNoAccData,
  getUserNoAccByMail,
  EmailExisted,
  getUserByEmail,
} = require("../../dbsetup");

class ReservationUserController {
  // tạo ra bài viết mới
  create(req, res, next) {
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
        } = req.body;
        const date = table_date.split("T")[0];
        let guest_id;

        if (EmailExisted(user_gmail) == null) {
          await setUserNoAccData(user_name, user_gmail, user_phone);
          const guests = await getUserNoAccByMail(user_gmail);
          guest_id = guests[0]?.guest_id;
          user_id = 1;
          setBookingData(
            user_id,
            date,
            table_time,
            number_people,
            message,
            guest_id
          );
        } else {
          guest_id = 1;
          const user = await getUserByEmail(user_gmail);
          const user_id = user; // Assign the correct value received from getUserByEmail
          setBookingData(
            user_id,
            date,
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
}

module.exports = new ReservationUserController();
