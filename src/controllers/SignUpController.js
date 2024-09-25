const { setUserData, EmailExisted, getUserByEmail } = require("../../dbsetup");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/sendMail");

class SignUpController {
  // Create a new user
  async create(req, res) {
    try {
      // Extract data from the request body
      const { name, gmail, password, DOB, phone } = req.body;

      // Check if the email already exists
      const existedMail = await EmailExisted(gmail);
      if (existedMail > 0) {
        // If email already exists, return an error message
        return res.status(400).send("Email already exists"); // Use 400 for bad request
      } else {
        // Generate a random salt for password hashing
        const saltRounds = 10; // Adjust this value as needed (higher = stronger)
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password with the generated salt
        const hash = await bcrypt.hash(password, salt);

        // Create a new user with the hashed password
        const newUser = await setUserData(name, gmail, hash, DOB, phone);
        if (!newUser) {
          return res.status(400).send("Error creating user"); // Use 400 for bad request
        }
        await sendMail({
          email: gmail,
          subject: "Welcome to SWI:P Speasky Bar",
          html: `
          <div style="background-color: rgba(245, 199, 113, 255); text-align: center;">
  <table align="center" style="margin: 0 auto;">
    <tr>
      <td style="padding: 20px;">
        <img
          src="https://res.cloudinary.com/dyapfszsy/image/upload/v1715610994/bar_website/dvshvvs3w159gutepdse.jpg"
          style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%; margin-bottom: 20px;"
        />
      </td>
    </tr>
    <tr>
      <td>
        <h1 style="font-weight: bold; font-size: 30px; color: #fff;">Welcome to SWI:P Speasky Bar</h1>
      </td>
    </tr>
    <tr>
      <td style="color: #fff; font-size: 20px;">Hi, ${name}</td>
    </tr>
    <tr>
      <td style="text-align: center; color: #fff; font-size: 18px;">
        Welcome to the SWI:P Speasky Bar family! We're excited to have you join our community of fun-loving people.
      </td>
    </tr>
    <tr>
      <td>
        <table align="center" style="margin: 10px auto;">
          <tr>
            <td style="background-color: #fff; padding: 10px; border-radius: 10px; margin: 10px;">
              <span style="font-weight: bold;">Orders giftcards for your friends and family</span>
            </td>
          </tr>
          <tr>
            <td style="background-color: #fff; padding: 10px; border-radius: 10px; margin: 10px;">
              <span style="font-weight: bold;">Receive exclusive offers and discounts</span>
            </td>
          </tr>
          <tr>
            <td style="background-color: #fff; padding: 10px; border-radius: 10px; margin: 10px;">
              <span style="font-weight: bold;">Information on upcoming events</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="text-align: center; color: #fff; font-size: 18px;">
        Thank you for joining us!
      </td>
    </tr>
    <tr>
      <td style="margin-top: 16px; text-align: center; color: #fff; font-size: 18px;">
        Best regards,
      </td>
    </tr>
    <tr>
      <td style="padding-bottom: 16px; text-align: center; color: #fff; font-size: 18px;">
        SWI:P Speasky Bar
      </td>
    </tr>
  </table>
</div>

        `,
        });
        // Return success message
        return res.status(201).send("Successfully created new user!"); // Use 201 for created
      }
    } catch (err) {
      // Handle any errors that occur
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new SignUpController();
