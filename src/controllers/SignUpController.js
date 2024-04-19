const { setUserData, EmailExisted } = require("../../dbsetup");
class SinUpController {
  // tạo ra bài viết mới
  create(req, res) {
    // lấy body từ form của client gửi lên
    const { name, gmail, password, DOB, phone } = req.body;
    //lấy giá trị body đó truyền vào hàm setUserData đã define trước đó
    EmailExisted(gmail)
      .then((existedEmail) => {
        if (existedEmail.length > 0) {
          // Nếu email đã tồn tại, trả về thông báo lỗi
          res.send("existed email");
        } else {
          // Nếu email chưa tồn tại, tiến hành tạo mới người dùng
          setUserData(name, gmail, password, DOB, phone)
            .then((newUser) => {
              // Nếu tạo mới người dùng thành công, trả về thông tin người dùng
              res.json(newUser);
            })
            .catch((err) => {
              // Xử lý lỗi nếu có
              console.error(err);
              res.status(500).send("Internal Error");
            });
        }
      })
      .catch((err) => {
        // Xử lý lỗi nếu có
        console.error(err);
        res.status(500).send("Internal Error");
      });
  }
}

module.exports = new SinUpController();
