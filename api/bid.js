
import ItemMapper from '../lib/ItemMapper'

import { toAddressFilter, accountToApiType } from '../lib/AccountUtil'
import { getUtcSeconds, getUtcNow } from '../lib/TimeUtil'
import { sanitizeDoc } from '../lib/sanitizer'
import { Account, getById as getAccountById } from './models/Account'
import { Comment } from './models/Comment'
import { isAuthenticated } from './auth_checker'

const { Router } = require('express')
const validator = require('express-validator')
const Bid = require('./models/Bid');
const ItemHistory = require('./models/ItemHistory');

const router = Router()

const bidToApiType = async (item) => {
    const doc = sanitizeDoc(item)
    return doc
}

const bidItem = [
    validator.body('itemId', 'Invalid item id').isAlphanumeric(),
    validator.body('value', 'Invalid value').isDecimal({ min: 0.1, max: 1000 }),
    validator.body('tokenType', 'Invalid tokenType').matches(/^(ARA|ETH)$/),
    (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.mapped() })
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

        bid.save((err, result) => {
            if (err) {
                return res.json({ error: "Cannot bid" })
            }
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
            .exec(async (err, bids) => {
                if (err) return res.json({ error: err })
                return res.json({ error: null, result: bids.map(sanitizeDoc) })
            })
    }
]

// Bid item
router.post('/bid', isAuthenticated, bidItem)

router.get('/items/:id/bids', bids)

module.exports = router




