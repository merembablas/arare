const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountModel = new Schema({
    name: { type: String, required: true },
    bio: { type: String, required: true },
    accountType: { type: String, required: true },
    pic: { type: String }, // optional
    primaryAddress: { type: String, required: true, index: { unique: true } },
    ethAddress: { type: String }, // crypto address
    nuchainAddress: { type: String }, // crypto address
    isCreator: { type: Boolean, required: true, default: false }
});


// get account by it id
function getById(objectId) {
    return new Promise((resolve, reject) => {
        return Account.findOne({ _id: objectId }, (err, account) => {
            if (err) {
                reject(err)
                return
            }
            return resolve(account)
        })
    })
}

// get account by hash
function getByPrimaryAddress(primaryAddress) {
    return new Promise((resolve, reject) => {
        return Account.findOne({ primaryAddress }, (err, account) => {
            if (err) {
                reject(err)
                return
            }
            return resolve(account)
        })
    })
}

const Account = mongoose.models.Account || mongoose.model('Account', AccountModel)

export {
    Account,
    getById,
    getByPrimaryAddress
}
