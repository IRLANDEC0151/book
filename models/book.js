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
  address: {
    type: String,
    required: true,
  },
  description: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = model("Book", bookSchema);
