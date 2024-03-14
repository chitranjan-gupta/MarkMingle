const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  no_of_users: {
    type: Number,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
module.exports = TeamSchema;
