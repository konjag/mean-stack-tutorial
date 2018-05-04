const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: String,
  date: {
    type: Date,
    default: Date.now()
  },
  isPublished: {
    type: Boolean,
    default: false
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
