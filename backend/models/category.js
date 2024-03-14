const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LinkSchema = require("./link");
const TeamSchema = require("./team");
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sub: {
    type: Boolean,
    required: true,
    default: false,
  },
  subcategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  icon: {
    type: String,
  },
  sharing: {
    type: Boolean,
    default: false,
  },
  no_of_links: {
    type: Number,
    default: 0,
  },
  no_of_subcategory: {
    type: Number,
    default: 0,
  },
  access: {
    type: TeamSchema,
  },
  links: [
    {
      type: LinkSchema,
    },
  ],
});

const Category = mongoose.model("Category", CategorySchema, "users");

module.exports = CategorySchema;
