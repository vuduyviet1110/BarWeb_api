const sendMail = require("../utils/sendMail");

class ResetPasswordController {
  // tạo ra bài viết mới
  create(req, res, next) {
    const { user_gmail, user_name, user_password } = req.body;

    sendMail({
      email: user_gmail,
      subject: "chuc mung ban dang ký thanh cong",
      html: `<h1 style ='color:red'> Cảm ơn bạn đã tham gia chương trình</h1>
      <ul>
        <li>
          User Name: ${user_name}
        </li>
        <li>
        Password: ${user_password}
      </li>
      </ul>
      `,
    })
      .then(() => {
        res.send(
          " Reseting password sucessfully. Please check your eamil to sê your user_name and password"
        );
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("An error occurred");
      });
    return res.status(201).json("Check your email");

    // res.json("Reseting.....");
  }
}

module.exports = new ResetPasswordController();
