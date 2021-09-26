

const { Router } = require('express')
const validator = require('express-validator')
const NftItem = require('./models/Item');

const router = Router()

const mint = [
    validator.body('title', 'Please enter title').isLength({ min: 1 }),
    validator.body('description', 'Please enter description').isLength({ min: 1 }),
    validator.body('royalties', 'Please enter royalties').isLength({ min: 1 }),
    validator.body('count', 'Please enter count').isLength({ min: 1 }),
    validator.body('hash', 'No hash').isLength({ min: 1 }),
    (req, res) => {
        const errors = validator.validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }

        const item = new NftItem({
            title: req.body.title,
            description: req.body.description,
            royalties: req.body.royalties,
            count: req.body.count,
            hash: req.body.hash,
            objectType: req.body.objectType,
            fileExtension: req.body.fileExtension,
            ownerAddress: req.body.ownerAddress,
        })

        item.save((err, itemResult) => {
            console.log("🚀 ~ file: items.js ~ line 30 ~ item.save ~ err", err)
            console.log("🚀 ~ file: items.js ~ line 30 ~ item.save ~ itemResult", itemResult)
            // if (err) {
            //     return res.status(500).json({ error: err, message: "Cannot save item into db" })
            // }
            return res.json({
                error: null,
                id: itemResult._id,
                hash: itemResult.hash,
            })
        })
    }
]

// Mint new item
router.post('/item/mint', mint)

// Burn existing item
// router.get('/items/burn', burn)

module.exports = router


