const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  bookName: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  status: Boolean,
  description: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = model("Book", bookSchema);
