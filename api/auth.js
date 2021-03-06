// import { accountToApiType } from '../lib/AccountUtil'
import { getByPrimaryAddress } from './models/Account'
import { isAuthenticated } from './auth_checker'
const jwt = require('jsonwebtoken')

const { Router } = require('express')
const validator = require('express-validator')

const { decodeAddress, signatureVerify } = require('@polkadot/util-crypto')
const { u8aToHex } = require('@polkadot/util')

const ethUtil = require('ethereumjs-util')
const config = require('./config')

const router = Router()

function isValidSignature(signedMessage, signature, address) {
  const publicKey = decodeAddress(address)
  const hexPublicKey = u8aToHex(publicKey)

  return signatureVerify(signedMessage, signature, hexPublicKey).isValid
}

const currentOtpCode = () => Math.floor(new Date().getTime() / 1000 / 30)

const authenticate = [
  validator.body('accountAddress', 'Invalid address').isAlphanumeric(),
  validator.body('signature', 'Invalid signature').isLength({ min: 10 }),
  async (req, res) => {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.mapped() })
    }

    const otp = currentOtpCode()
    console.log('🚀 ~ file: auth.js ~ line 31 ~ otp', otp)

    const primaryAddress = req.body.accountAddress
    console.log('🚀 ~ file: auth.js ~ line 36 ~ primaryAddress', primaryAddress)

    if (
      isValidSignature(`${otp}`, req.body.signature, primaryAddress) ||
      /* Kurangi/tambahi -/+ 1 digit untuk mentoleransi keterlambatan waktu/pergantian
               batas waktu 30 detik */
      isValidSignature(`${otp - 1}`, req.body.signature, primaryAddress) ||
      isValidSignature(`${otp + 1}`, req.body.signature, primaryAddress)
    ) {
      const account = await getByPrimaryAddress(primaryAddress)
      console.log('🚀 ~ file: auth.js ~ line 43 ~ account', account)
      console.log('🚀 ~ file: auth.js ~ line 43 ~ config.secret', config.secret)

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
      console.log('🚀 ~ file: auth.js ~ line 39 ~ jwt token', token)
      return res.json({
        error: null,
        result: token
      })
    } else {
      console.log(
        'Signature',
        req.body.signature,
        'by account address',
        req.body.accountAddress,
        'not valid'
      )
      return res.json({ error: 'unauthorized' })
    }
  }
]

/**
 * Verifikasi eth compatible digital signature
 * yang biasanya diinisiasi oleh Metamask.
 * @param {Number} otp kode otp
 * @param {String} signature digital signature in hex
 * @param {String} address eth compatible address
 * @returns Boolean, true apabila berhasil diverifikasi
 */
function verifyMetamaskSignature(otp, signature, address) {
  //   // keccak == sha3
  //   const msg = ethUtil.keccak(Buffer.from(`${otp}`))
  //   const msg2 = ethUtil.keccak(Buffer.from(`${otp - 1}`))
  //   const msg3 = ethUtil.keccak(Buffer.from(`${otp + 1}`))

  const msg = Buffer.from(`Please sign this message: ${otp}`)
  const msg2 = Buffer.from(`Please sign this message: ${otp - 1}`)
  const msg3 = Buffer.from(`Please sign this message: ${otp + 1}`)

  const { v, r, s } = ethUtil.fromRpcSig(signature)

  // kita perlu menambahkan prefix agar sesuai spesifikasi
  // https://web3js.readthedocs.io/en/v1.2.11/web3-eth-personal.html#sign
  // karena client menggunakan eth.personal.sign yang mana
  // message akan ditambahkan prefix sebelum di-sign
  const prefix = Buffer.from('\x19Ethereum Signed Message:\n')
  const prefixedMsg = ethUtil.keccak(
    Buffer.concat([prefix, Buffer.from(String(msg.length)), msg])
  )
  const prefixedMsg2 = ethUtil.keccak(
    Buffer.concat([prefix, Buffer.from(String(msg2.length)), msg2])
  )
  const prefixedMsg3 = ethUtil.keccak(
    Buffer.concat([prefix, Buffer.from(String(msg3.length)), msg3])
  )

  const pub = ethUtil.ecrecover(prefixedMsg, v, r, s)
  const pub2 = ethUtil.ecrecover(prefixedMsg2, v, r, s)
  const pub3 = ethUtil.ecrecover(prefixedMsg3, v, r, s)

  const signingAddress = ethUtil.bufferToHex(ethUtil.pubToAddress(pub))
  const signingAddress2 = ethUtil.bufferToHex(ethUtil.pubToAddress(pub2))
  const signingAddress3 = ethUtil.bufferToHex(ethUtil.pubToAddress(pub3))

  return (
    signingAddress === address ||
    signingAddress2 === address ||
    signingAddress3 === address
  )
}

const authenticateMetamask = [
  validator.body('accountAddress', 'Invalid address').isAlphanumeric(),
  validator.body('signature', 'Invalid signature').isLength({ min: 10 }),
  async (req, res) => {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.mapped() })
    }

    const otp = currentOtpCode()
    console.log('🚀 ~ file: auth.js ~ line 31 ~ otp', otp)

    const primaryAddress = req.body.accountAddress
    console.log('🚀 ~ file: auth.js ~ line 36 ~ primaryAddress', primaryAddress)

    if (verifyMetamaskSignature(otp, req.body.signature, primaryAddress)) {
      const account = await getByPrimaryAddress(primaryAddress)
      console.log('🚀 ~ file: auth.js ~ line 43 ~ account', account)
      console.log('🚀 ~ file: auth.js ~ line 43 ~ config.secret', config.secret)

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
      console.log('🚀 ~ file: auth.js ~ line 39 ~ jwt token', token)
      return res.json({
        error: null,
        result: token
      })
    } else {
      console.log(
        'Signature',
        req.body.signature,
        'by account address',
        req.body.accountAddress,
        'not valid'
      )
      return res.json({ error: 'unauthorized' })
    }
  }
]

// API endpoint untuk memperbaharui access token
const refreshToken = [
  async (req, res) => {
    const account = await getByPrimaryAddress(req.currentUser.primaryAddress)
    if (!account) {
      return res.status(401).json({ error: 'Account not found' })
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
router.post('/auth/authenticate-metamask', authenticateMetamask)
router.post('/auth/refresh-token', isAuthenticated, refreshToken)

module.exports = router
