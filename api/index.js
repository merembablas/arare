const express = require('express')

require('./db')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const items = require('./items')
const account = require('./account')
const auth = require('./auth')
const bid = require('./bid')

app.use(items)
app.use(account)
app.use(auth)
app.use(bid)

// module.exports = app

export default app
