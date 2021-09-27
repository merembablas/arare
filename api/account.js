

const { Router } = require('express')
const validator = require('express-validator')
const Account = require('./models/Account');
const NftItem = require('./models/Item');

import { accountToApiType } from '../lib/AccountUtil'
import { Types } from 'mongoose'

const router = Router()

const register = [
    validator.body('name', 'Invalid name').isLength({ min: 3, max: 100 }),
    validator.body('bio', 'Invalid bio').isLength({ min: 3, max: 500 }),
    (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }

        const account = new Account({
            name: req.body.name,
            bio: req.body.bio,
            accountType: req.body.accountType,
            ethAddress: req.body.ethAddress,
            nuchainAddress: req.body.nuchainAddress,
            primaryAddress: req.body.primaryAddress,
        })

        account.save((err, result) => {
            if (err) {
                console.log("🚀 ~ file: account.js ~ line 28 ~ account.save ~ err", err)
                return res.status(500).json({ error: "Cannot register account" })
            }
            return res.json({ error: null, id: result._id })
        })
    }
]

const accountInfo = [
    validator.param('id', 'Invalid id').isAlphanumeric(),
    (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }

        let _id = null

        try {
            _id = new Types.ObjectId(req.params.id)
        } catch {
            return res.status(400).json({ errors: "Invalid id type" })
        }

        Account.findOne({ _id }, (err, account) => {
            if (err) {
                throw err
            }
            return res.json({ error: null, result: account })
        })
    }
]


const items = [
    validator.param('accountId', 'Invalid id').isAlphanumeric(),
    validator.query('offset', 'Invalid offset').isInt(),
    validator.query('limit', 'Invalid limit').isInt(),
    (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }

        Account.findOne({ primaryAddress: req.params.accountId }, (err, acc) => {
            if (!acc) {
                return res.status(404).json({ errors: "Not found" })
            }
            let ownerAddress = accountToApiType(acc).prefixedAddress
            console.log("🚀 ~ file: account.js ~ line 95 ~ Account.findOne ~ ownerAddress", ownerAddress)
            NftItem.find({ ownerAddress }, (err, items) => {
                if (err) {
                    throw err
                }
                return res.json({
                    error: null,
                    result: items
                })
            })
        })

    }
]

// Register account
router.post('/account/register', register)

// Get user info
router.get('/accounts/:id', accountInfo)

// Get user's items
router.get('/accounts/:accountId/items', items)

module.exports = router


