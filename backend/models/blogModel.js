const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/blogApp");

const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    content: String,
    uploadedBy: String,
    date: {
      type: Date,
      default: Date.now
    },
    isBlocked: {
      type: Boolean,
      default: false
    }
});

module.exports = mongoose.model('Blog', blogSchema);