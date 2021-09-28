const express = require('express')
// const _db = require('./db')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const items = require('./items')
const account = require('./account')

app.use(items)
app.use(account)

// module.exports = app

export default app
