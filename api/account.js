

// const Account = require('./models/Account');
import { Types } from 'mongoose'
import ItemMapper from '../lib/ItemMapper'
import { accountToApiType } from '../lib/AccountUtil'
import { Account, getById as getAccountById, getByPrimaryAddress } from './models/account'

const { Router } = require('express')
const validator = require('express-validator')
const NftItem = require('./models/Item');

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
            isCreator: req.body.isCreator,
        })

        account.save((err, result) => {
            if (err) {
                console.log("🚀 ~ file: account.js ~ line 28 ~ account.save ~ err", err)
                return res.status(500).json({ error: "Cannot register account" })
            }
            return res.json({ error: null, result: accountToApiType(result) })
        })
    }
]

const accountInfo = [
    validator.param('id', 'Invalid id').isAlphanumeric(),
    async (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }

        try {
            const _id = new Types.ObjectId(req.params.id)
            return res.json({ error: null, result: accountToApiType(await getAccountById(_id)) })
        } catch {
            // try to request by it hash
            try {
                return res.json({ error: null, result: accountToApiType(await getByPrimaryAddress(req.params.id)) })
            } catch {
                return res.status(400).json({ errors: "Not found or invalid id type" })
            }

        }

    }
]


const items = [
    validator.param('accountId', 'Invalid id').isAlphanumeric(),
    validator.query('offset', 'Invalid offset').default('0').isInt(),
    validator.query('limit', 'Invalid limit').default('10').isInt(),
    (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }

        Account.findById(req.params.accountId, (err, acc) => {
            if (err) {
                return res.status(500).json({ error: "Cannot connect to database" })
            }
            if (!acc) {
                return res.status(404).json({ error: "Not found" })
            }
            // let ownerAddress = accountToApiType(acc).prefixedAddress
            // console.log("🚀 ~ file: account.js ~ line 95 ~ Account.findOne ~ ownerAddress", ownerAddress)
            NftItem.find({ creatorId: acc.id }, (err, items) => {
                if (err) {
                    throw err
                }
                return res.json({
                    error: null,
                    result: items.map(item => ItemMapper(item, accountToApiType(acc)))
                })
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
        Account.find({}, (err, accounts) => {
            if (err) {
                return res.status(500).json({ error: err })
            }
            return res.json({ error: null, result: accounts.map(accountToApiType) })
        })
    }
]

// Register account
router.post('/account/register', register)

// Get user info
router.get('/accounts/:id', accountInfo)

// Get user's items
router.get('/accounts/:accountId/items', items)

router.get('/creator/popular', popular)

module.exports = router


