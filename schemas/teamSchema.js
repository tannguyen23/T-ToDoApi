const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Member = require("../models/memberModel");
const User = require("../models/userModel");

const MemberSchema = Member.schema;
const UserSchema = User.schema;

const TeamSchema = mongoose.Schema({
	name: { type: String, required: true },
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	members: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
			require: false,
		},
	],
	createDate: { type: Date, required: true },
});

module.exports = TeamSchema;
