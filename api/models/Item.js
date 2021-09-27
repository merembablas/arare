const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    royalties: { type: Number, required: true },
    count: { type: Number, required: true },
    hash: { type: String, required: true, index: { unique: true } },
    objectType: { type: String, required: true },
    fileExtension: { type: String }, // optional
    ownerAddress: { type: String, required: true } // crypto address
});

const NftItem = mongoose.models.Item || mongoose.model('Item', Item)

module.exports = NftItem;