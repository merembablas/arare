const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bid = new Schema({
    objectId: { type: String, required: true },
    initiatorId: { type: String, required: true },
    initiatorName: { type: String, required: true },
    timestamp: { type: Number, required: true },
    value: { type: Number, required: true },
    approved: { type: Number, required: true },
    meta: { type: Object, default: null }
});

const Bid = mongoose.models.Bid || mongoose.model('Bid', BidModel)

module.exports = Bid;
