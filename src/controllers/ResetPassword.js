const sendMail = require("../utils/sendMail");
const { getUserByEmail, updateUserAcc } = require("../../dbsetup");
const generateRandomPassword = require("../utils/randomPwd");

class ResetPasswordController {
  async create(req, res, next) {
    try {
      const { user_gmail } = req.body;

      const matched_user = await getUserByEmail(user_gmail);

      if (!matched_user) {
        return res.status(404).send("No email existed");
      }

      const newPassword = generateRandomPassword(10);
      const saltRounds = 10; // Adjust this value as needed (higher = stronger)
      const salt = await bcrypt.genSalt(saltRounds);

      // Hash the password with the generated salt
      const hash = await bcrypt.hash(newPassword, salt);
      await updateUserAcc(user_gmail, hash);

      await sendMail({
        email: user_gmail,
        subject: "Reset Your Password",
        html: `
          <div style="text-align:center">
            <h1 style="color:lightblue">Reset Your Password</h1>
            <p style="color:red">We suggest that you need to change your password after recieving this in order to save your account</p>
            <p>Below is your new password:</p>
            <ul>
              <li><strong>User Name:</strong> ${matched_user.user_name}</li>
              <li><strong>Password:</strong> ${newPassword}</li>
            </ul>
            <p>If you have any question or need help, please contact us at <a href="mailto:support@swip.com">support@swip.com</a></p>
          </div>
        `,
      });

      return res
        .status(200)
        .send(
          "We have sent information via your email. Please check your email to see your username and password."
        );
    } catch (error) {
      console.error(error);
      return res.status(500).send("An error occurred");
    }
  }
}

module.exports = new ResetPasswordController();
