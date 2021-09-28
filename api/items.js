

// const Account = require('./models/account');
import ItemMapper from '../lib/ItemMapper'

import { toAddressFilter, accountToApiType } from '../lib/AccountUtil'
import { Account } from './models/account'
import { isAuthenticated } from './auth_checker'
import { getUtcSeconds } from '../lib/TimeUtil'
import { sanitizeDoc } from '../lib/sanitizer'

const { Router } = require('express')
const validator = require('express-validator')
const NftItem = require('./models/Item');
const ItemHistory = require('./models/ItemHistory');

const router = Router()

const mint = [
    validator.body('name', 'Please enter name').isLength({ min: 1 }),
    validator.body('description', 'Please enter description').isLength({ min: 1 }),
    validator.body('royalties', 'Please enter royalties').isDecimal({ min: 0, max: 90 }),
    validator.body('count', 'Please enter count').isLength({ min: 1 }),
    validator.body('hash', 'No hash').isLength({ min: 1 }),
    validator.body('serialNumber', 'Invalid serial number').default('1').isInt({ min: 1, max: 100 }),
    validator.body('totalSupply', 'Invalid total supply').default('1').isInt({ min: 1, max: 100 }),
    async (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }

        console.log("currentUser:", req.currentUser)

        const item = new NftItem({
            name: req.body.name,
            description: req.body.description,
            royalties: req.body.royalties,
            count: req.body.count,
            hash: req.body.hash,
            objectType: req.body.objectType,
            fileExtension: req.body.fileExtension,
            ownerAddress: req.body.ownerAddress,
            creatorId: req.body.creatorId,
            mint: {
                block: '1333333',
                timestamp: getUtcSeconds()
            },
            likes: 0,
            value: 0,
            verified: false,
            serialNumber: req.body.serialNumber,
            totalSupply: req.body.totalSupply,
        })

        try {

            let createdItem = await item.save()
            console.log("🚀 ~ file: items.js ~ line 48 ~ createdItem", createdItem)
            //     console.log("🚀 ~ file: items.js ~ line 30 ~ item.save ~ err", err)
            //     console.log("🚀 ~ file: items.js ~ line 30 ~ item.save ~ itemResult", itemResult)

            //     return res.json({
            //         error: null,
            //         id: itemResult._id,
            //         hash: itemResult.hash,
            //     })
            // })

            // @TODO: pastikan mint dulu ke blockchain baru
            //        tambahkan history
            const itemHistory = new ItemHistory({
                activity: 'mint',
                objectId: `${createdItem._id}`,
                initiatorId: req.currentUser.id,
                initiatorName: req.currentUser.name,
                value: 0,
                timestamp: new Date().getTime(),
                meta: {}
            })

            let _ = await itemHistory.save()

            return res.json({
                error: null,
                result: createdItem
            })
        } catch (err) {
            console.log("🚀 ~ file: items.js ~ line 79 ~ err", err)
            return res.status(500).json({ error: "Cannot save data" })
        }
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

const popular = [
    validator.query('offset', 'Invalid offset').default('0').isInt(),
    validator.query('limit', 'Invalid limit').default('10').isInt(),
    (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }
        // @TODO: add filtering
        NftItem.find({}, async (err, items) => {
            if (err) {
                return res.status(500).json({ errors: "Cannot get items" })
            }
            const result = await Promise.all(items.map(async (item) => {
                // console.log("🚀 ~ file: items.js ~ line 96 ~ result:items.map ~ item", item)
                const creator = await Account.findById(item.creatorId).exec()
                return ItemMapper(item, accountToApiType(creator))
            }))
            return res.json({
                error: null,
                result
            })
        })
    }
]

const histories = [
    validator.param('id', 'Invalid id').isAlphanumeric(),
    validator.query('offset', 'Invalid offset').default('0').isInt(),
    validator.query('limit', 'Invalid limit').default('10').isInt(),
    (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }

        const objectId = req.params.id

        ItemHistory.find({ objectId })
            .sort({ timestamp: -1 })
            .exec(async (err, items) => {
                if (err) {
                    return res.status(500).json({ errors: "Cannot get item history" })
                }
                return res.json({
                    error: null,
                    result: items.map(sanitizeDoc)
                })
            })
    }
]

// Mint new item
router.post('/item/mint', isAuthenticated, mint)

router.get('/item/popular', popular)

router.get('/items/:id', getItem)
router.get('/items/:id/histories', histories)

module.exports = router


