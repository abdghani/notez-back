const { model, Schema } = require('mongoose');

const memoSchema = new Schema({
  userSub: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tags: [String]
});

module.exports = model('Memo', memoSchema);
