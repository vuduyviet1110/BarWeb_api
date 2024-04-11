class ReservationUserController {
  // tạo ra bài viết mới
  create(req, res, next) {
    // lấy body từ form của client gửi lên
    const { id, people, email, time, message, phone, date } = req.body;
    // console.log(req.body);
    // //lấy giá trị body đó truyền vào hàm setUserData đã define trước đó
    // setUserData(name, gmail, password, DOB, phone)
    //   .then((newUser) => {
    //     // newUser là  kết quả xử lý của hàm setUserData
    //     if (newUser) {
    //       res.json(newUser);
    //     } else {
    //       res.send("Incorrect User ID!");
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     res.status(500).send("Internal Server Error");
    //   });
    res.json("nhận được phản hồi");
  }
}

module.exports = new ReservationUserController();
