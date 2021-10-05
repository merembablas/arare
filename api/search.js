
import ItemMapper from '../lib/ItemMapper'

import { accountToApiType } from '../lib/AccountUtil'
import { Account } from './models/Account'
import { NftItem } from './models/Item';

const { Router } = require('express')
const validator = require('express-validator')

const router = Router()

const searchItems = [
    validator.query('q', 'Invalid query').isLength({ min: 1, max: 100 }),
    validator.query('offset', 'Invalid offset').default('0').isInt(),
    validator.query('limit', 'Invalid limit').default('10').isInt(),
    (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }
        const query = req.query.q
        console.log("🚀 ~ file: search.js ~ line 29 ~ query", query)
        NftItem.find({ name: { $regex: query, $options: 'i' } }, async (err, items) => {
            if (err) {
                console.log("🚀 ~ file: search.js ~ line 31 ~ NftItem.find ~ err", err)
                return res.json({ error: "Cannot search items" })
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

router.get('/search/items', searchItems)

module.exports = router


