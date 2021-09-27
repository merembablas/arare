

const Account = require('./models/Account');

// get account by it id
async function getById(objectId) {
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
async function getByPrimaryAddress(primaryAddress) {
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


