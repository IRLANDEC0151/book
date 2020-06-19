const { Schema, model } = require("mongoose");

const placeSchema = new Schema({
  address: {
    city: String,
    street: String,
    house: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}); 

module.exports = model("Place", placeSchema);
