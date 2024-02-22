const batchModel = require("../model/batchModel");

const createBatch = async (req, res, next) => {
  const { batchID, startDate, endDate, batchName } = req.body;

  const newBatch = new batchModel({
    batchID,
    startDate,
    endDate,
    batchName,
    users: [],
  });

  try {
    await newBatch.save();
    res.status(201).json({ message: "Batch created successfully", batch: newBatch });
  } catch (error) {
    console.error("Error while creating batch:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllBatches = async (req, res, next) => {
  try {
    const batches = await batchModel.find();
    res.status(200).json({ batches });
  } catch (error) {
    console.error("Error while fetching batches:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBatch = async (req, res, next) => {
  const { batchId } = req.params;

  try {
    const batch = await batchModel.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.status(200).json({ batch });
  } catch (error) {
    console.error("Error while fetching batch:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBatch = async (req, res, next) => {
  const { batchId } = req.params;
  const { startDate, endDate, batchName } = req.body;

  try {
    const updatedBatch = await batchModel.findByIdAndUpdate(
      batchId,
      { startDate, endDate, batchName },
      { new: true }
    );

    if (!updatedBatch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.status(200).json({ message: "Batch updated successfully", batch: updatedBatch });
  } catch (error) {
    console.error("Error while updating batch:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a batch by ID
const deleteBatch = async (req, res, next) => {
  const { batchId } = req.params;

  try {
    const deletedBatch = await batchModel.findByIdAndDelete(batchId);

    if (!deletedBatch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    res.status(200).json({ message: "Batch deleted successfully", batch: deletedBatch });
  } catch (error) {
    console.error("Error while deleting batch:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createBatch, getAllBatches, getBatch, updateBatch, deleteBatch };
