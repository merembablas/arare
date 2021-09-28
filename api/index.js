const express = require('express')
const _ = require('./db')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const items = require('./items')
const account = require('./account')
const auth = require('./auth')

app.use(items)
app.use(account)
app.use(auth)

// module.exports = app

export default app
