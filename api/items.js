

const { Router } = require('express')
const validator = require('express-validator')
const Account = require('./models/account');
const NftItem = require('./models/Item');
import ItemMapper from '../lib/ItemMapper'

import { toAddressFilter, accountToApiType } from '../lib/AccountUtil'

const router = Router()

const mint = [
    validator.body('name', 'Please enter name').isLength({ min: 1 }),
    validator.body('description', 'Please enter description').isLength({ min: 1 }),
    validator.body('royalties', 'Please enter royalties').isLength({ min: 1 }),
    validator.body('count', 'Please enter count').isLength({ min: 1 }),
    validator.body('hash', 'No hash').isLength({ min: 1 }),
    (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }

        const item = new NftItem({
            name: req.body.name,
            description: req.body.description,
            royalties: req.body.royalties,
            count: req.body.count,
            hash: req.body.hash,
            objectType: req.body.objectType,
            fileExtension: req.body.fileExtension,
            ownerAddress: req.body.ownerAddress,
        })

        item.save((err, itemResult) => {
            console.log("🚀 ~ file: items.js ~ line 30 ~ item.save ~ err", err)
            console.log("🚀 ~ file: items.js ~ line 30 ~ item.save ~ itemResult", itemResult)
            // if (err) {
            //     return res.status(500).json({ error: err, message: "Cannot save item into db" })
            // }
            return res.json({
                error: null,
                id: itemResult._id,
                hash: itemResult.hash,
            })
        })
    }
]

const getItem = [
    validator.param('id', 'Invalid id').isAlphanumeric().isLength({ min: 1, max: 256 }),
    (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }
        NftItem.findOne({ hash: req.params.id }, (err, item) => {
            // console.log("🚀 ~ file: items.js ~ line 56 ~ NftItem.findOne ~ err", err)
            // console.log("🚀 ~ file: items.js ~ line 55 ~ NftItem.findOne ~ item", item)
            if (err) {
                console.log("🚀 ~ file: items.js ~ line 56 ~ NftItem.findOne ~ err", err)
                alert("Cannot fetch data")
                return res.status(500).json({ error: err })
            }
            if (!item) {
                return res.status(404).json({ error: "Not found" })
            }
            // get creator
            Account.findOne(toAddressFilter(item.ownerAddress), (err, creator) => {
                if (err) return res.status(404).json({ error: 'Item has no owner' })
                return res.json(ItemMapper(item, accountToApiType(creator)))
            })
        })
    }
]

// Mint new item
router.post('/item/mint', mint)

// Burn existing item
// router.get('/items/burn', burn)

router.get('/items/:id', getItem)

module.exports = router


