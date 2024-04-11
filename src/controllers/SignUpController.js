const { setUserData } = require("../../dbsetup");
class SinUpController {
  // tạo ra bài viết mới
  create(req, res) {
    // lấy body từ form của client gửi lên
    const { name, gmail, password, DOB, phone } = req.body;
    console.log(req.body);
    //lấy giá trị body đó truyền vào hàm setUserData đã define trước đó
    setUserData(name, gmail, password, DOB, phone)
      .then((newUser) => {
        // newUser là  kết quả xử lý của hàm setUserData
        if (newUser) {
          res.json(newUser);
        } else {
          res.send("Incorrect User ID!");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  }
}

module.exports = new SinUpController();
