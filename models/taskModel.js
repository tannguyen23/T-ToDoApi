const mongoose = require("mongoose");

const Category = require("./categoryModel");
const Member = require("./memberModel");

const CategorySchema = Category.schema;
const MemberSchema = Member.schema;

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    imgUrl: { type: String, required: true },
    description: { type: String, required: true },
    timeStart: { type: Date, required: false },
    timeEnd: { type: Date, required: false },
    categories: {
      type: [CategorySchema],
      required: false,
    },
    members: {
      type: [MemberSchema],
      required: false,
    },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
