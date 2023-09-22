const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = require("../models/categoryModel");
const Member = require("../models/memberModel");
const User = require("../models/userModel");

const CategorySchema = Category.schema;
const UserSchema = User.schema;
const MemberSchema = Member.schema;

const TaskSchema = mongoose.Schema(
	{
		title: { type: String, required: true },
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		imgUrl: { type: String, required: true },
		description: { type: String, required: true },
		timeStart: { type: Date, required: false },
		timeEnd: { type: Date, required: false },
		categories: {
			type: [CategorySchema],
			required: false,
		},
		members: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
				require: false,
			},
		],
		status: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

module.exports = TaskSchema;
