const express = require('express')

require('./db')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const items = require('./items')
const account = require('./account')
const auth = require('./auth')
const bid = require('./bid')
const search = require('./search')
const stats = require('./stats')

app.use(items)
app.use(account)
app.use(auth)
app.use(bid)
app.use(search)
app.use(stats)

// module.exports = app

export default app
