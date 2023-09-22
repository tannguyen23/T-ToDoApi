const TeamService = require("../services/teamService");
const UserService = require("../services/userService");

class TeamController {
	// TODO : API FOR CREATE NEW TEAM
	static async apiCreateTeam(req, res) {
		try {
			const addTeam = {
				name: req.body.name,
				description: req.body.description,
				members: req.body.members,
				ownerId: req.body.ownerId,
				createDate: req.body.createDate,
			};
			const result = await TeamService.createTeam(addTeam);
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(400).json({ message: "Team creation failed" });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: error.message });
		}
	}

	// TODO : API FOR GET TEAM BY ID
	static async apiGetTeamById(req, res) {
		try {
			const id = req.params.id;
			const team = await TeamService.getTeamById(id);
			if (team != null) {
				res.status(200).json(team);
			}
		} catch (error) {
			if (error.message === "team not found") {
				res.status(404).json({ message: "Team not found" });
			} else {

				res.status(500).json({ message: error.message });
			}
		}
	}

	// TODO : API FOR GET ALL TEAMS BY OWNERID
	static async apiGetAllTeamByOwnerId(req, res) {
		try {
			const ownerId = req.params.id;
			const teams = await TeamService.getAllTeamOfOwnerByOwnerId(ownerId);
			res.status(200).json(teams);
		} catch (error) {
			console.log("Error : ", error);
			if ((error.message = "user not found")) {
				res
					.status(404)
					.json({ message: "Can not find ownerId : " + req.params.id });
			} else {
				res.status(500).json({ message: error.message });
			}
		}
	}

	// TODO : API FOR GET ALL JOINED TEAMS BY OWNERID
	static async apiGetAllJoinTeamByOwnerId(req, res) {
		try {
			const ownerId = req.params.id;
			const teams = await TeamService.getAllJoinedTeamsByOwnerId(ownerId);
			res.status(200).json(teams);
		} catch (error) {
			console.log("Error : ", error);
			res.status(500).json({ message: error.message });
		}
	}
}

module.exports = TeamController;
