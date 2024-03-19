const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    batchID: {
        type: String,
        required: true,
    },
    batchName: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },

});

const batchModel = mongoose.model('Batch', batchSchema);

module.exports = batchModel;