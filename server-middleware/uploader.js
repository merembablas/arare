const express = require('express')
const multer = require('multer')

const path = require('path')
const fs = require('fs')

const hasha = require('hasha')

var app = express()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
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
  let upload = multer({
    storage: storage,
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
    let stream = fs.createReadStream(req.file.path)

    let hash = await hasha.fromStream(stream, { algorithm: 'sha256' })
    console.log('🚀 ~ file: uploader.js ~ line 65 ~ hash', hash)

    res.on('close', () => {
      stream.close()
    })

    res.json({
      error: null,
      url: req.file.path,
      hash
    })
  })
})

module.exports = app
