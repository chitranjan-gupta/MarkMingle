const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LinkSchema = new Schema({
  url: {
    type: String,
    unique: true,
    required: true,
  },
  priority: {
    type: Boolean,
    default: false,
  },
  tags: [
    {
      type: String,
    },
  ],
  fav: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  modified_date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = LinkSchema;
