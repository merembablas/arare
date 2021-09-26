

const { Router } = require('express')
const validator = require('express-validator')
const NftItem = require('./models/Item');

const router = Router()

const items = [
    validator.query('offset', 'Invalid offset').isInt(),
    validator.query('limit', 'Invalid limit').isInt(),
    (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }

        NftItem.find({ ownerAddress: req.params.accountId }, (err, items) => {
            if (err) {
                throw err
            }
            return res.json({
                error: null,
                result: items
            })
        })
    }
]

// Get user's items
router.get('/accounts/:accountId/items', items)

module.exports = router


