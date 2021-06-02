const { model, Schema } = require('mongoose');

const todoSchema = new Schema({
  userSub: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tags: [String],
  status: Boolean
});

module.exports = model('Todo', todoSchema);
