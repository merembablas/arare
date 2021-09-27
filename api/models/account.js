const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    name: { type: String, required: true },
    bio: { type: String, required: true },
    accountType: { type: String, required: true },
    pic: { type: String }, // optional
    primaryAddress: { type: String, required: true, index: { unique: true } },
    ethAddress: { type: String }, // crypto address
    nuchainAddress: { type: String, required: true }, // crypto address
    isCreator: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.models.Account || mongoose.model('Account', Account);