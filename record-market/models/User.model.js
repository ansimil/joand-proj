const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    collections: [{
      type: Schema.Types.ObjectId,
      ref: 'Collection'
    }],
    adress: [{
      city: String,
      street: String,
    }]    
  },  

  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
