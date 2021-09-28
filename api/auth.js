
import { getByPrimaryAddress } from './models/Account'
import { accountToApiType } from '../lib/AccountUtil'
import { isAuthenticated } from './auth_checker'
const jwt = require('jsonwebtoken');

const { Router } = require('express')
const validator = require('express-validator')

const { decodeAddress, signatureVerify } = require('@polkadot/util-crypto');
const { u8aToHex } = require('@polkadot/util');

const config = require('./config')

const router = Router()

function isValidSignature(signedMessage, signature, address) {
    const publicKey = decodeAddress(address);
    const hexPublicKey = u8aToHex(publicKey);

    return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
};

const currentOtpCode = () => Math.floor(new Date().getTime() / 1000 / 30)

const authenticate = [
    validator.body('accountAddress', 'Invalid address').isAlphanumeric(),
    validator.body('signature', 'Invalid signature').isLength({ min: 10 }),
    async (req, res) => {
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.mapped() });
        }

        const otp = currentOtpCode()
        console.log("🚀 ~ file: auth.js ~ line 31 ~ otp", otp)

        const primaryAddress = req.body.accountAddress
        console.log("🚀 ~ file: auth.js ~ line 36 ~ primaryAddress", primaryAddress)

        if (isValidSignature(`ch:${otp}`, req.body.signature, primaryAddress) ||
            /* Tambahkan +1 digit untuk mentoleransi keterlambatan waktu/pergantian
               batas waktu 30 detik */
            isValidSignature(`ch:${(otp + 1)}`, req.body.signature, primaryAddress)) {

            const account = await getByPrimaryAddress(primaryAddress)
            console.log("🚀 ~ file: auth.js ~ line 43 ~ account", account)
            console.log("🚀 ~ file: auth.js ~ line 43 ~ config.secret", config.secret)

            let simpleAccount = {}

            if (account) {
                simpleAccount = {
                    id: `${account._id}`,
                    name: account.name,
                    primaryAddress: account.primaryAddress
                }
            } else {
                simpleAccount = {
                    id: null, // anggap belum ada (registered)
                    name: null, // anggap belum ada (registered)
                    primaryAddress
                }
            }

            const token = jwt.sign(simpleAccount, config.secret)
            console.log("🚀 ~ file: auth.js ~ line 39 ~ jwt token", token)
            return res.json({
                error: null,
                result: token
            })
        } else {
            console.log("Signature", req.body.signature, "by account address", req.body.accountAddress, "not valid")
            return res.json({ error: "unauthorized" })
        }

    }
]

// API endpoint untuk memperbaharui access token
const refreshToken = [
    async (req, res) => {
        const account = await getByPrimaryAddress(req.currentUser.primaryAddress)
        if (!account) {
            return res.status(401).json({ error: "Account not found" })
        }
        const simpleAccount = {
            id: `${account._id}`,
            name: account.name,
            primaryAddress: account.primaryAddress
        }
        const token = jwt.sign(simpleAccount, config.secret)
        return res.json({ error: null, result: token })
    }
]

router.post('/auth/authenticate', authenticate)
router.post('/auth/refresh-token', isAuthenticated, refreshToken)

module.exports = router

