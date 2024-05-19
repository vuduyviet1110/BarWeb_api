const { setUserData, EmailExisted } = require("../../dbsetup");

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
        return res.send("Email exists");
      } else {
        // If email does not exist, proceed to create a new user
        const newUser = await setUserData(name, gmail, password, DOB, phone);
        // Return the new user data
        return res.json(newUser);
      }
    } catch (err) {
      // Handle any errors that occur
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = new SignUpController();
