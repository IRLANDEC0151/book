const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: String,
  address: {
    city: String,
    street: String,
    house: String,
  },
  books: { 
    type: Schema.Types.ObjectId,
    ref: "Statistics",
  },
});

module.exports = model("User", userSchema);
