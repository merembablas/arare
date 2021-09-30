
import ItemMapper from '../lib/ItemMapper'

import { toAddressFilter, accountToApiType } from '../lib/AccountUtil'
import { getUtcSeconds, getUtcNow } from '../lib/TimeUtil'
import { sanitizeDoc } from '../lib/sanitizer'
import { Account, getById as getAccountById } from './models/Account'
import { Comment } from './models/Comment'
import { isAuthenticated } from './auth_checker'
// const NftItem = require('./models/Item');
import { NftItem } from './models/Item';

const { Router } = require('express')
const validator = require('express-validator')
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
            return res.status(400).json({ error: errors.mapped() })
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

            const createdItem = await item.save()
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

            await itemHistory.save()

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
            .exec((err, items) => {
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

const itemToApiType = async (item, creatorId) => {
    const doc = sanitizeDoc(item)
    doc.creator = accountToApiType(await getAccountById(creatorId))
    return doc
}


const comments = [
    validator.param('id', 'Invalid id').isAlphanumeric(),
    validator.query('offset', 'Invalid offset').default('0').isInt(),
    validator.query('limit', 'Invalid limit').default('10').isInt(),
    (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }

        const objectId = req.params.id

        Comment.find({ objectId })
            .sort({ timestamp: -1 })
            .limit(5)
            .exec(async (err, items) => {
                if (err) {
                    console.log("🚀 ~ file: items.js ~ line 188 ~ .exec ~ err", err)
                    return res.json({ error: "Cannot get item's comment" })
                }
                return res.json({
                    error: null,
                    result: await Promise.all(items.map(item => itemToApiType(item, item.initiatorId)))
                })
            })
    }
]

const addComments = [
    validator.param('id', 'Invalid id').isAlphanumeric(),
    validator.body('message', 'Invalid message').isLength({ min: 3, max: 160 }),
    (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({ error: errors.mapped().message.msg })
        }

        const comment = new Comment({
            objectId: req.params.id,
            initiatorId: req.currentUser.id,
            initiatorName: req.currentUser.name,
            timestamp: getUtcNow(),
            message: req.body.message,
            meta: {}
        })

        comment.save(async (err, result) => {
            if (err) {
                console.log("🚀 ~ file: items.js ~ line 219 ~ comment.save ~ err", err)
                return res.json({ error: "Cannot write comment" })
            }
            return res.json({ error: null, result: await itemToApiType(result, req.currentUser.id) })
        })
    }
]

// Mint new item
router.post('/item/mint', isAuthenticated, mint)

router.get('/item/popular', popular)

router.get('/items/:id', getItem)
router.get('/items/:id/histories', histories)
router.get('/items/:id/comments', comments)
router.post('/items/:id/comments', isAuthenticated, addComments)

module.exports = router


