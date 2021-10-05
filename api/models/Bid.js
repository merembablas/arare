const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BidModel = new Schema({
    itemId: { type: String, required: true },
    initiatorId: { type: String, required: true },
    initiatorName: { type: String, required: true },
    timestamp: { type: Number, required: true },
    value: { type: Number, required: true },
    approved: { type: Boolean, required: true, default: false },
    tokenType: { type: String, required: true },
    meta: { type: Object, default: null }
});

const Bid = mongoose.models.Bid || mongoose.model('Bid', BidModel)

module.exports = Bid;
