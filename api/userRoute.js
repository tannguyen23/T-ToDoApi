const express = require("express");
const userRoute = express.Router();
const UserController = require("../controllers/userController");
const isAuth = require("../auth/auth.middleware");

userRoute.post("/register", UserController.apiRegister);

userRoute.post("/login", UserController.apiLogin);

userRoute.post("/refresh", UserController.apiRefresh);

userRoute.get(
	"/dropdown-member/:id",
	isAuth,
	UserController.apiGetListDropdownMembers
);
module.exports = userRoute;
