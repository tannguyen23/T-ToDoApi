const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  hashPassword: { type: String, required: true },
  refreshToken: {
    type: String,
  },
  fullname: { type: String, required: true },
  email: { type: String, required: true, min: 6, max: 255 },
  address: { type: String, required: true },
  avaUrl: { type: String, required: true },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  teams : [
    {
      type : Schema.Types.ObjectId,
      ref : "Team",
    }
  ]
});

module.exports = UserSchema;
