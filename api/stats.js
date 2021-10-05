
import ItemMapper from '../lib/ItemMapper'

// import { toAddressFilter, accountToApiType } from '../lib/AccountUtil'
// import { getUtcSeconds, getUtcNow } from '../lib/TimeUtil'
// import { sanitizeDoc } from '../lib/sanitizer'
// import { Account, getById as getAccountById } from './models/Account'
// import { Comment } from './models/Comment'
import { isAuthenticated } from './auth_checker'
import { NftItem } from './models/Item';

const { Router } = require('express')
// const validator = require('express-validator')
// const ItemHistory = require('./models/ItemHistory');

const router = Router()


const stats = [
    async (req, res) => {
        // const errors = validator.validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.json({ error: errors.mapped() })
        // }

        const currentUserId = req.currentUser.id
        const primaryAddress = req.currentUser.primaryAddress

        const ownedCount = await NftItem.count({ ownerAddress: primaryAddress }).exec();
        const createdCount = await NftItem.count({ creatorId: currentUserId }).exec();
        let topItems = await NftItem.find({ creatorId: currentUserId })
            .sort({ likes: -1 })
            .limit(10).exec();

        topItems = topItems.map(ItemMapper, null)

        return res.json({
            error: null,
            result: {
                ownedCount, createdCount,
                transactions: [],
                topItems
            }
        })
    }
]

const createdCount = [
    async (req, res) => {

        const currentUserId = req.currentUser.id
        // const primaryAddress = req.currentUser.primaryAddress

        const count = await NftItem.count({ creatorId: currentUserId }).exec();

        return res.json({
            error: null,
            result: count
        })
    }
]


router.get('/stats', isAuthenticated, stats)
router.get('/stats/created-count', isAuthenticated, createdCount)

module.exports = router


