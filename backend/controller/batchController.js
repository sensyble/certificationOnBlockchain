const batchModel = require("../model/batchModel");

const createBatch = (batch) => {
  return new Promise((resolve) => {
    const { batchID, startDate, endDate, batchName } = batch;

    const newBatch = new batchModel({
      batchID,
      startDate,
      endDate,
      batchName,
    });

    newBatch.save()
      .then((result) => {
        const response = { isError: false, batch: result, errors: [] };
        resolve(response);
      })
      .catch((err) => {
        const response = { isError: true, batch: {}, errors: [] };
        resolve(response);
      });
  });
};

const getAllBatches = () => {
  return new Promise((resolve, reject) => {
    batchModel.find()
      .then((batches) => {
        resolve({ batches });
      })
      .catch((error) => {
        console.error("Error while fetching batches:", error.message);
        reject(error);
      });
  });
};

const getBatch = (batchId) => {
  return new Promise((resolve) => {
    batchModel.findById(batchId)
      .then((batch) => {
        if (!batch) {
          resolve({ isError: true, message: "Batch not found", batch: {} });
        } else {
          const { _id, batchID, startDate, endDate, batchName } = batch;
          resolve({ isError: false, batch: { _id, batchID, startDate, endDate, batchName }, errors: [] });
        }
      })
      .catch((error) => {
        console.error("Error while fetching batch:", error.message);
        resolve({ isError: true, errors: [error.message], batch: {} });
      });
  });
};

const updateBatch = (batchId, { startDate, endDate, batchName }) => {
  return new Promise((resolve) => {
    batchModel.findByIdAndUpdate(
      batchId,
      { startDate, endDate, batchName },
      { new: true }
    )
      .then((updatedBatch) => {
        if (!updatedBatch) {
          resolve({ isError: true, message: "Batch not found", batch: {} });
        } else {
          resolve({ message: "Batch updated successfully", batch: updatedBatch });
        }
      })
      .catch((error) => {
        console.error("Error while updating batch:", error.message);
        resolve({ isError: true, errors: [error.message], batch: {} });
      });
  });
};

// Delete a batch by ID
const deleteBatch = (batchId) => {
  return new Promise((resolve) => {
    batchModel.findByIdAndDelete(batchId)
      .then((deletedBatch) => {
        if (!deletedBatch) {
          resolve({ isError: true, message: "Batch not found", batch: {} });
        } else {
          resolve({ message: "Batch deleted successfully", batch: deletedBatch });
        }
      })
      .catch((error) => {
        console.error("Error while deleting batch:", error.message);
        resolve({ isError: true, errors: [error.message], batch: {} });
      });
  });
};

module.exports = { createBatch, getAllBatches, getBatch, updateBatch, deleteBatch };
