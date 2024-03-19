const addUsersToBatch = async (req, res, next) => {
    const { batchId, usernames } = req.body;
  
    try {
      // Find user IDs based on usernames
      const usersToAdd = await userModel.find({ username: { $in: usernames } }, '_id');
  
      if (usersToAdd.length !== usernames.length) {
        return res.status(400).json({ message: "Invalid username(s) provided" });
      }
  
      // Update the batch by pushing user IDs to the users array
      const updatedBatch = await batchModel.findByIdAndUpdate(
        batchId,
        { $push: { users: { $each: usersToAdd } } },
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