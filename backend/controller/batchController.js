const batchModel = require("../model/batchModel");
const userModel = require("../model/userModel");

const createBatch = async (req, res, next) => {
  const { batchID, startDate, endDate, batchName } = req.body;

  const newBatch = new batchModel({
    batchID,
    startDate,
    endDate,
    batchName,
    users: [], // I Initialize with empty array
  });

  try {
    await newBatch.save();
    res.status(201).json({ message: "Batch created successfully" });
  } catch (error) {
    console.error("Error while creating batch:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addUsersToBatch = async (req, res, next) => {
  const { batchID, usernames } = req.body;

  try {
    // Find user IDs based on usernames
    const userToAdd = await userModel.find({ username: { $in: usernames } }, '_id');

    if (userToAdd.length !== usernames.length) {
      return res.status(400).json({ message: "Invalid username(s) provided" });
    }

    //update with array pushing
    const updatedBatch = await batchModel.findOneAndUpdate(
      { batchID },
      { $push: { users: { $each: userToAdd } } },
      { new: true }
    );

    if (!updatedBatch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.status(200).json({ message: "Users added to the batch successfully", batch: updatedBatch });
  } catch (error) {
    console.error("Error while adding users to the batch:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { createBatch, addUserToBatch };
