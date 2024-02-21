const batchModel = require("../model/batchModel");
const userModel = require("../model/userModel");

const createBatch = async (req, res, next) => {
  const { batchID, startDate, endDate, batchName, usernameFind } = req.body;

  // Find user IDs based on usernames
  const usersToAdd = await userModel.find({ username: { $in: usernameFind } }, '_id');

  if (usersToAdd.length !== usernames.length) {
    return res.status(400).json({ message: "Invalid username(s) provided" });
  }

  const newBatch = new batchModel({
    batchID,
    startDate,
    endDate,
    batchName,
    users: usersToAdd,
  });

  try {
    await newBatch.save();
    res.status(201).json({ message: "Batch created successfully" });
  } catch (error) {
    console.error("Error while creating batch:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add other batch-related controllers as needed

module.exports = { createBatch };
