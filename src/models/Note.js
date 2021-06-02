const { model, Schema } = require('mongoose');

const noteSchema = new Schema({
  userSub: String,
  title: String,
  content: String,
  createdAt: String,
  
  archieved: Boolean,
  tags: [String],
  has_header: Boolean,
  header_image: String,
  header_content: String

});

module.exports = model('Note', noteSchema);
