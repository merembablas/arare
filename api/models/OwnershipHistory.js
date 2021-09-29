const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OwnershipHistoryModel = new Schema({
    initiatorId: { type: String, required: true },
    initiatorName: { type: String, required: true },
    timestamp: { type: Number, required: true },
    meta: { type: Object, default: null }
});

const OwnershipHistory = mongoose.models.OwnershipHistory || mongoose.model('OwnershipHistory', OwnershipHistoryModel)

module.exports = OwnershipHistory;
