const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentModel = new Schema({
    objectId: { type: String, required: true },
    initiatorId: { type: String, required: true },
    initiatorName: { type: String, required: true },
    timestamp: { type: Number, required: true },
    message: { type: String, required: true },
    meta: { type: Object, default: null }
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentModel)

export { Comment }
