const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemHistoryModel = new Schema({
    activity: { type: String, required: true },
    objectId: { type: String, required: true },
    initiatorId: { type: String, required: true },
    initiatorName: { type: String, required: true },
    value: { type: Number, required: true, default: 0 },
    timestamp: { type: Number, required: true },
    meta: { type: Object, default: null }
});

const ItemHistory = mongoose.models.ItemHistory || mongoose.model('ItemHistory', ItemHistoryModel)

module.exports = ItemHistory;
