// Stores user's item view history

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ViewHistoryModel = new Schema({
    itemId: { type: String, required: true, index: { unique: true } },
    userId: { type: String, required: true },
    timestamp: { type: Number, required: true }
})

const ViewHistory =
    mongoose.models.ViewHistory ||
    mongoose.model('ViewHistory', ViewHistoryModel)

module.exports = ViewHistory
