const sendMail = require("../utils/sendMail");
const { getUserByEmail } = require("../../dbsetup");

class ResetPasswordController {
  create(req, res, next) {
    const { user_gmail } = req.body;
    getUserByEmail(user_gmail)
      .then((matched_user) => {
        if (matched_user) {
          sendMail({
            email: user_gmail,
            subject: "Review Your Password",
            html: `
              <div style="color:red">Note: You need to review your user name. We suggest that you need to change your password in order to save your account</div>
              <ul>
                <li>User Name: ${matched_user.user_name}</li>
                <li>Password: ${matched_user.user_password}</li>
              </ul>
            `,
          });
          return res.send(
            "We have sent information via your email. Please check your email to see your username and password."
          );
        } else {
          res.send("No email existed");
        }
      })
      .catch((error) => {
        console.error(error);
        return res.send("An error occurred");
      });
  }
}

module.exports = new ResetPasswordController();
