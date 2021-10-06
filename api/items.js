import { Types } from 'mongoose'

import ItemMapper from '../lib/ItemMapper'

import { toAddressFilter, accountToApiType } from '../lib/AccountUtil'
import { getUtcSeconds, getUtcNow } from '../lib/TimeUtil'
import { sanitizeDoc } from '../lib/sanitizer'
import { Account, getById as getAccountById } from './models/Account'
import { Comment } from './models/Comment'
import { isAuthenticated } from './auth_checker'
// const NftItem = require('./models/Item');
import { NftItem } from './models/Item'

const { Router } = require('express')
const validator = require('express-validator')
const ItemHistory = require('./models/ItemHistory')
const ViewHistory = require('./models/ViewHistory')

const router = Router()

const mint = [
  validator.body('name', 'Please enter name').isLength({ min: 1 }),
  validator
    .body('description', 'Please enter description')
    .isLength({ min: 1 }),
  validator
    .body('royalties', 'Please enter royalties')
    .isDecimal({ min: 0, max: 90 }),
  validator.body('count', 'Please enter count').isLength({ min: 1 }),
  validator.body('hash', 'No hash').isLength({ min: 1 }),
  validator
    .body('serialNumber', 'Invalid serial number')
    .default('1')
    .isInt({ min: 1, max: 100 }),
  validator
    .body('totalSupply', 'Invalid total supply')
    .default('1')
    .isInt({ min: 1, max: 100 }),
  validator
    .body('hasPhysicalAsset', 'Invalid hasPhysicalAsset')
    .default('false')
    .isBoolean(),
  async (req, res) => {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.mapped() })
    }

    console.log('currentUser:', req.currentUser)

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
      timestamp: getUtcNow(),
      likes: 0,
      value: 0,
      verified: false,
      serialNumber: req.body.serialNumber,
      totalSupply: req.body.totalSupply,
      computedValue: 0,
      network: 1,
      hasPhysicalAsset: req.body.hasPhysicalAsset
    })

    try {
      const createdItem = await item.save()
      console.log('🚀 ~ file: items.js ~ line 48 ~ createdItem', createdItem)
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
      console.log('🚀 ~ file: items.js ~ line 79 ~ err', err)
      return res.status(500).json({ error: 'Cannot save data' })
    }
  }
]

const getItem = [
  validator
    .param('id', 'Invalid id')
    .isAlphanumeric()
    .isLength({ min: 1, max: 256 }),
  (req, res) => {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() })
    }
    NftItem.findOne({ hash: req.params.id }, (err, item) => {
      // console.log("🚀 ~ file: items.js ~ line 56 ~ NftItem.findOne ~ err", err)
      // console.log("🚀 ~ file: items.js ~ line 55 ~ NftItem.findOne ~ item", item)
      if (err) {
        console.log(
          '🚀 ~ file: items.js ~ line 56 ~ NftItem.findOne ~ err',
          err
        )
        return res.json({ error: err })
      }
      if (!item) {
        return res.json({ error: 'Not found' })
      }
      // get creator
      Account.findOne(toAddressFilter(item.ownerAddress), (err, creator) => {
        if (err) return res.json({ error: 'Item has no owner' })
        return res.json(ItemMapper(item, accountToApiType(creator)))
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
          return res.status(500).json({ errors: 'Cannot get item history' })
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
          console.log('🚀 ~ file: items.js ~ line 188 ~ .exec ~ err', err)
          return res.json({ error: "Cannot get item's comment" })
        }
        return res.json({
          error: null,
          result: await Promise.all(
            items.map((item) => itemToApiType(item, item.initiatorId))
          )
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
        console.log('🚀 ~ file: items.js ~ line 219 ~ comment.save ~ err', err)
        return res.json({ error: 'Cannot write comment' })
      }
      return res.json({
        error: null,
        result: await itemToApiType(result, req.currentUser.id)
      })
    })
  }
]

const addLikes = [
  validator.param('id', 'Invalid id').isAlphanumeric(),
  (req, res) => {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({ error: errors.mapped().message.msg })
    }

    const userId = req.currentUser.id
    const userName = req.currentUser.name

    NftItem.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 }, $push: { likers: { userName, userId } } },
      (err, result) => {
        if (err) {
          console.log(
            '🚀 ~ file: items.js ~ line 246 ~ NftItem.findByIdAndUpdate ~ err',
            err
          )
          return res.json({ error: 'Cannot add like' })
        }
        return res.json({ error: null, result: 1 })
      }
    )
  }
]

const removeLikes = [
  validator.param('id', 'Invalid id').isAlphanumeric(),
  (req, res) => {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({ error: errors.mapped().message.msg })
    }

    const userId = req.currentUser.id
    const userName = req.currentUser.name

    NftItem.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: -1 }, $pull: { likers: { userName, userId } } },
      (err, _) => {
        if (err) {
          return res.json({ error: 'Cannot add like' })
        }
        return res.json({ error: null, result: 1 })
      }
    )
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
    NftItem.find({})
      .sort({ likes: -1 })
      .limit(10)
      .exec(async (err, items) => {
        if (err) {
          return res.status(500).json({ errors: 'Cannot get items' })
        }
        const result = await Promise.all(
          items.map(async (item) => {
            // console.log("🚀 ~ file: items.js ~ line 96 ~ result:items.map ~ item", item)
            const creator = await Account.findById(item.creatorId).exec()
            return ItemMapper(item, accountToApiType(creator))
          })
        )
        return res.json({
          error: null,
          result
        })
      })
  }
]

const valuedItems = [
  validator.query('offset', 'Invalid offset').default('0').isInt(),
  validator.query('limit', 'Invalid limit').default('10').isInt(),
  (req, res) => {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({ error: errors.mapped() })
    }

    NftItem.find({})
      .sort({ value: -1 })
      .exec(async (err, items) => {
        if (err) {
          return res.json({ error: 'Cannot get valued items' })
        }
        const result = await Promise.all(
          items.map(async (item) => {
            const creator = await Account.findById(item.creatorId).exec()
            return ItemMapper(item, accountToApiType(creator))
          })
        )
        return res.json({
          error: null,
          result
        })
      })
  }
]

const latestItems = [
  validator.query('offset', 'Invalid offset').default('0').isInt(),
  validator.query('limit', 'Invalid limit').default('10').isInt(),
  (req, res) => {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({ error: errors.mapped() })
    }

    NftItem.find({})
      .sort({ timestamp: -1 })
      .exec(async (err, items) => {
        if (err) {
          return res.json({ error: 'Cannot get valued items' })
        }
        const result = await Promise.all(
          items.map(async (item) => {
            const creator = await Account.findById(item.creatorId).exec()
            return ItemMapper(item, accountToApiType(creator))
          })
        )
        return res.json({
          error: null,
          result
        })
      })
  }
]

const lastViews = [
  validator.query('offset', 'Invalid offset').default('0').isInt(),
  validator.query('limit', 'Invalid limit').default('10').isInt(),
  (req, res) => {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({ error: errors.mapped() })
    }

    ViewHistory.find({ userId: req.currentUser.id })
      .sort({ timestamp: -1 })
      .limit(20)
      .exec((err, itemRefs) => {
        if (err) {
          return res.json({ error: 'Cannot get valued itemRefs' })
        }
        const itemIds = itemRefs.map((item) => Types.ObjectId(item.itemId))
        // const orderingTs = itemRefs.map((item) => [item.itemId, item.timestamp])

        NftItem.find({ _id: { $in: itemIds } })
          // .sort({ timestamp: -1 })
          .limit(20)
          .exec(async (err, items) => {
            if (err) {
              console.log(
                '🚀 ~ file: items.js ~ line 415 ~ NftItem.find ~ err',
                err
              )
              return res.json({ error: 'Cannot get items' })
            }

            const result = await Promise.all(
              items.map(async (item) => {
                const creator = await Account.findById(item.creatorId).exec()
                const itemRef = itemRefs.find(
                  (a) => a.itemId === item._id.toString()
                )
                item.timestamp = itemRef.timestamp
                return ItemMapper(item, accountToApiType(creator))
              })
            )
            return res.json({
              result: result.sort((a, b) => b.timestamp - a.timestamp)
            })
          })
      })
  }
]

const addViewHistory = [
  validator.param('id', 'Invalid id').isAlphanumeric(),
  // validator.body('userId', 'Invalid userId').isAlphanumeric(),
  (req, res) => {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.json({ error: errors.mapped() })
    }

    const view = {
      itemId: req.params.id,
      userId: req.currentUser.id,
      timestamp: getUtcNow()
    }

    ViewHistory.findOneAndReplace(
      { _id: Types.ObjectId(view.itemId) },
      view,
      null,
      (err, result) => {
        if (err) {
          console.log('[ERROR]', err)
          return res.json({ error: 'cannot save view history' })
        }
        console.log('🚀 ~ file: items.js ~ line 414 ~ result', result)
        return res.json({ result: 'ok' })
      }
    )
  }
]

// Mint new item
router.post('/item/mint', isAuthenticated, mint)

router.get('/item/popular', popular)
router.get('/item/valued', valuedItems)
router.get('/item/latest', latestItems)
router.get('/item/last-views', isAuthenticated, lastViews)

router.get('/items/:id', getItem)
router.get('/items/:id/histories', histories)
router.get('/items/:id/comments', comments)
router.post('/items/:id/comments', isAuthenticated, addComments)
router.post('/items/:id/likes', isAuthenticated, addLikes)
router.delete('/items/:id/likes', isAuthenticated, removeLikes)

router.post('/items/:id/views', isAuthenticated, addViewHistory)

module.exports = router
