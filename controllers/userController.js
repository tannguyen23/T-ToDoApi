const UserService = require("../services/userService");
const {
	generateToken,
	decodeToken,
	verifyToken,
} = require("../auth/auth.method");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const randToken = require("rand-token");

const jwtVariable = require("../variables/jwt");

class UserController {
	// TODO: API FOR REGISTER
	static async apiRegister(req, res) {
		try {
			const saltRounds = 10;
			const checkEmailExist = await UserService.checkEmailExist(req.body.email);
			const checkUsernameExist = await UserService.checkUsernameExist(
				req.body.username
			);
			const salt = await bcrypt.genSalt(saltRounds);
			const hashPassword = await bcrypt.hash(req.body.password, salt);
			// check duplicate
			if (checkEmailExist) return res.status(422).send("Email is exist");
			if (checkUsernameExist) return res.status(422).send("Username is exist");

			const newUser = {
				username: req.body.username,
				hashPassword: hashPassword,
				fullname: req.body.fullname,
				email: req.body.email,
				address: req.body.address,
				avaUrl: req.body.avaUrl,
			};
			const user = await UserService.createNewUser(newUser);
			res.status(200).json(user);
		} catch (error) {
			console.log(error);
			res.status(400).send({ message: error.message });
		}
	}
	// TODO : API FOR LOGIN
	static async apiLogin(req, res) {
		try {
			const username = req.body.username;
			const password = req.body.password;
			let user = await UserService.getUserByUsername(username);
			if (!user) {
				res.status(401).send({ message: "Login failed" });
			} else {
				const isPasswordValid = await bcrypt.compare(
					password,
					user.hashPassword
				);

				if (!isPasswordValid) {
					return res.status(401).send({ message: "Login failed" });
				}

				const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
				const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

				const dataForAccessToken = {
					username: user.username,
				};

				const accessToken = await generateToken(
					dataForAccessToken,
					accessTokenSecret,
					accessTokenLife
				);

				if (!accessToken) {
					return res.status(401).send({ message: "Login failed" });
				}

				// Create a random refresh token
				let refreshToken = randToken.generate(jwtVariable.refreshTokenSize);

				if (!user.refreshToken) {
					console.log("user not have refresh token");
					//If user not have refresh token => save this refresh token into DB
					const result = await UserService.saveRefreshToken(
						username,
						refreshToken
					);
					if (!result) {
						console.log("Save refresh token failed");
					}
				} else {
					//Is user had refresh token => take refresh token from DB
					refreshToken = user.refreshToken;
				}

				return res.status(200).json({
					msg: "Login successfully",
					accessToken,
					refreshToken,
					user,
				});
			}
		} catch (error) {
			console.log(error);
			res.status(500).send({ message: error.message });
		}
	}
	// TODO : API FOR REFRESH NEW ACCESS TOKEN
	static async apiRefresh(req, res) {
		// get access token from header
		const accessTokenFromHeader = req.headers.x_authorization;
		if (!accessTokenFromHeader) {
			return res.status(400).send("Access token not found");
		}

		// get refresh token from body
		const refreshTokenFromBody = req.body.refreshToken;
		if (!refreshTokenFromBody) {
			return res.status(400).send("Refresh token not found");
		}

		const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
		const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

		// Decode access token
		const decoded = await decodeToken(accessTokenFromHeader, accessTokenSecret);
		if (!decoded) {
			return res.status(400).send("Access token not valid");
		}
		console.log(JSON.stringify(decoded));

		const username = decoded.payload.username; // Lấy id từ payload

		const user = await UserService.getUserByUsername(username);
		if (!user) {
			return res.status(401).send("User not found");
		}

		if (refreshTokenFromBody !== user.refreshToken) {
			return res.status(400).send("Refresh token not valid");
		}

		// Create new access token
		const dataForAccessToken = {
			username,
		};

		const accessToken = await generateToken(
			dataForAccessToken,
			accessTokenSecret,
			accessTokenLife
		);
		if (!accessToken) {
			return res.status(400).send("Create access token failed");
		}
		return res.json({
			accessToken,
		});
	}
	// TODO : API FOR GET LIST DROPDOWN
	static async apiGetListDropdownMembers(req, res) {
		try {
			const ownerId = req.params.id;
			const membersDropdown = await UserService.getListUserDropdown(ownerId);
			res.status(200).json(membersDropdown);
		} catch (error) {
			console.log("Error : ", error);
			res.status(500).json({ message: error.message });
		}
	}
}

module.exports = UserController;
