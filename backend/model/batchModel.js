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
    //we could push users while making the batch in this array
    users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        }
      ],

});

const batchModel = mongoose.model('Batch', batchSchema);

module.exports = batchModel;