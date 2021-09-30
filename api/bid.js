
import { getUtcNow } from '../lib/TimeUtil'
import { sanitizeDoc } from '../lib/sanitizer'
import { isAuthenticated } from './auth_checker'
import { NftItem, getById as getNftItemById } from './models/Item';

const { Router } = require('express')
const validator = require('express-validator')
const Bid = require('./models/Bid');

const router = Router()

const bidToApiType = (item) => {
    const doc = sanitizeDoc(item)
    return doc
}

const bidItem = [
    validator.body('itemId', 'Invalid item id').isAlphanumeric(),
    validator.body('value', 'Invalid value').isDecimal({ min: 0.1, max: 1000 }),
    validator.body('tokenType', 'Invalid tokenType').matches(/^(ARA|ETH)$/),
    async (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.mapped() })
        }

        const item = await getNftItemById(req.body.itemId)

        if (!item) {
            return res.json({ error: "Item not found" })
        }

        // kamu gak bisa bid item-mu sendiri
        if (req.currentUser.id === item.creatorId) {
            return res.json({ error: "Cannot bid on your created item" })
        }
        if (req.currentUser.primaryAddress === item.ownerAddress) {
            return res.json({ error: "Cannot bid on your own item" })
        }

        // bid harus lebih besar dari bid terakhir
        const latestBid = await Bid.find({ itemId: req.body.itemId })
            .sort({ value: -1 })
            .limit(1).exec()
            .then((result) => {
                console.log("🚀 ~ file: bid.js ~ line 52 ~ .then ~ result", result)
                if (result.length > 0) {
                    return result[0]
                }
                return null
            })

        if (latestBid) {
            console.log("🚀 ~ file: bid.js ~ line 49 ~ latestBid", latestBid)
            if (req.body.value <= latestBid.value) {
                return res.json({ error: "Value must be greater than latest bid" })
            }
        }


        const bid = new Bid({
            itemId: req.body.itemId,
            initiatorId: req.currentUser.id,
            initiatorName: req.currentUser.name,
            timestamp: getUtcNow(),
            value: req.body.value,
            approved: false,
            tokenType: req.body.tokenType,
            meta: {}
        })

        bid.save(async (err, result) => {
            console.log("🚀 ~ file: bid.js ~ line 45 ~ bid.save ~ result", result)
            if (err) {
                return res.json({ error: "Cannot bid" })
            }

            // update item value
            // item.value = result.value
            await NftItem.updateOne({ itemId: item.id }, { value: result.value })

            return res.json({ error: null, result: bidToApiType(result) })
        })
    }
]

const bids = [
    validator.param('id', 'Invalid id').isAlphanumeric(),
    validator.query('offset', 'Invalid offset').default('0').isInt(),
    validator.query('limit', 'Invalid limit').default('10').isInt(),
    (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.mapped() })
        }

        Bid.find({ itemId: req.params.id }).sort({ timestamp: -1 }).limit(5)
            .exec((err, bids) => {
                if (err) return res.json({ error: err })
                return res.json({ error: null, result: bids.map(sanitizeDoc) })
            })
    }
]

// Bid item
router.post('/bid', isAuthenticated, bidItem)

router.get('/items/:id/bids', bids)

module.exports = router




