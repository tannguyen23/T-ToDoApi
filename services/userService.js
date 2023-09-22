const User = require("../models/userModel");

class UserService {
	static async checkEmailExist(email) {
		try {
			const result = await User.findOne({ email: email });
			if (result) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log("check email exist error : ", error);
		}
	}

	static async getListUserDropdown(ownerId) {
		try {
			const users = await User.find({ "_id": { $ne: ownerId } }).select(
				"_id fullname"
			);
			if (users !== null) {
				return users;
			} else {
				throw new Error("users not found");
			}
		} catch (error) {
			console.log("get list drodown user error : " + error);
			throw new Error(error);
		}
	}

	static async checkUsernameExist(username) {
		try {
			const result = await User.findOne({ username: username });
			if (result) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log("check username exist error : ", error);
		}
	}

	static async createNewUser(user) {
		try {
			const result = await User.create(
				new User({
					username: user.username,
					hashPassword: user.hashPassword,
					fullname: user.fullname,
					email: user.email,
					address: user.address,
					avaUrl: user.avaUrl,
				})
			);
			if (result !== null) {
				return result;
			}
		} catch (error) {
			console.log("create new user error : ", error);
		}
	}

	static async getUserByUsername(username) {
		try {
			const result = await User.findOne({ username: username });
			if (result !== null) {
				return result;
			}
		} catch (error) {
			console.log("get user by username error : ", error);
		}
	}

	static async getUserById(id) {
		try {
			const result = await User.findById(id);
			if (result !== null) {
				return result;
			}
		} catch (error) {
			console.log("get user by id error : ", error);
		}
	}

	static async saveRefreshToken(username, refreshToken) {
		try {
			const result = await User.findOneAndUpdate(
				{ username: username },
				{
					$set: { "refreshToken": refreshToken },
				}
			);
			if (result !== null) {
				return true;
			} else {
				false;
			}
		} catch (error) {
			console.log("save refresh token error : ", error);
		}
	}
}

module.exports = UserService;
