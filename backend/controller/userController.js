const bcrypt = require("bcryptjs");
const userModel = require("../model/userModel");

const registerUser = async (req, res, next) => {
    
  // email id duplication validation
  let checkExistingUser;
  try {
    checkExistingUser = await userModel.findOne({ email: req.body.email });
  } catch (error) {
    console.log("User exist already", error.message);
  }

  if (checkExistingUser) {
    return res.status(400).json({ message: "User exist already" });
  }
  // email id duplication validation end

  const {
    name,
    username,
    email,
    institute_id,
    password,
    confirm_password,
    institute_role,
  } = req.body;

  // hashing the password and confirm password
  const hashedPassword = bcrypt.hashSync(password);
  const hashedConfirmPassword = bcrypt.hashSync(confirm_password);

  // Create a new user instance
  const newUser = new userModel({
    name,
    username,
    email,
    institute_id,
    password: hashedPassword,
    institute_role,
    confirm_password: hashedConfirmPassword,
  });

  try {
    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error while saving user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { registerUser };
