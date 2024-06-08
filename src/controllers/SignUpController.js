const { setUserData, EmailExisted } = require("../../dbsetup");
const bcrypt = require("bcrypt");

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
