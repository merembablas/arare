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
    ownerAddress: { type: String, required: true }, // crypto address
    creatorId: { type: String, required: true },
    mint: { type: Object, default: null }, // mint information, like when the item is mint, will be set to null if not mint yet
    likes: { type: Number, required: true, default: 0 },
    value: { type: Number, required: true, default: 0 },
    verified: { type: Boolean, required: true, default: false },
    serialNumber: { type: Number, required: true, default: 1 },
    totalSupply: { type: Number, required: true, default: 1 },
    likers: { type: Array, required: true, default: [] }
});

const NftItem = mongoose.models.Item || mongoose.model('Item', Item)


// get account by it id
function getById(objectId) {
    return new Promise((resolve, reject) => {
        return NftItem.findOne({ _id: objectId }, (err, item) => {
            if (err) {
                reject(err)
                return
            }
            return resolve(item)
        })
    })
}


export { NftItem, getById }