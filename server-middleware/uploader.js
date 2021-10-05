const path = require('path')
const fs = require('fs')

const express = require('express')
const multer = require('multer')


const hasha = require('hasha')

const app = express()

// console.log('process.env.uploadDir:', process.env.UPLOAD_DIR)

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, process.env.UPLOAD_DIR)
    },

    // By default, multer removes file extensions so let's add them back
    filename(req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        )
    }
})

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpe?g|gif|png)$/i)) {
        req.fileValidationError = 'Only image files are allowed!'
        return cb(new Error('Only image files are allowed!'), false)
    }
    cb(null, true)
}

app.post('/upload_picture', (req, res) => {
    const upload = multer({
        storage,
        fileFilter: imageFilter
    }).single('picture')

    upload(req, res, async function (err) {
        if (req.fileValidationError) {
            return res.send(req.fileValidationError)
        } else if (!req.file) {
            return res.send({ error: 'No picture uploaded' })
        } else if (err instanceof multer.MulterError) {
            return res.json({ error: err })
        } else if (err) {
            return res.json({ error: err })
        }
        const stream = fs.createReadStream(req.file.path)
        console.log("🚀 ~ file: uploader.js ~ line 56 ~ req.file", req.file)

        const hash = await hasha.fromStream(stream, { algorithm: 'sha256' })
        console.log('🚀 ~ file: uploader.js ~ line 65 ~ hash', hash)

        res.on('close', () => {
            stream.close()
        })

        // rename
        const fileExtension = path.extname(req.file.path)
        const newBaseName = `${hash}${fileExtension}`
        const newName = `${process.env.UPLOAD_DIR}/${newBaseName}`
        console.log("🚀 ~ file: uploader.js ~ line 62 ~ newName", newName)
        fs.rename(req.file.path, newName, (err, existing) => {
            if (err) {
                throw err
            }
        });
        const url = `${process.env.BASE_UPLOAD_URL}/${newBaseName}`

        res.json({
            error: null,
            url,
            hash,
            fileExtension
        })
    })
})

module.exports = app
