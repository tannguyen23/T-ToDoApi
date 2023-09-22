const express = require("express");
const teamRoute = express.Router();
const TeamController = require("../controllers/teamController");
const isAuth = require("../auth/auth.middleware");

// TODO: create a task
teamRoute.post("/", isAuth, TeamController.apiCreateTeam);

// TODO : get all my teams by ownerid
teamRoute.get("/my-teams/:id", isAuth, TeamController.apiGetAllTeamByOwnerId);

// TODO : get all joined teams by ownerid
teamRoute.get("/joined-teams/:id", isAuth, TeamController.apiGetAllJoinTeamByOwnerId);

// TODO : get team by id
teamRoute.get("/:id", isAuth, TeamController.apiGetTeamById);

module.exports = teamRoute;
