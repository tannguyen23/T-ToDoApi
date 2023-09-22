const Team = require("../models/teamModel");
const User = require("../models/userModel");

class TeamService {
	static async createTeam(newTeam) {
		try {
			const addTeam = {
				name: newTeam.name,
				description: newTeam.description,
				members: newTeam.members,
				owner: newTeam.ownerId,
				createDate: newTeam.createDate,
			};
			let checkAddSuccess = true;
			const addedTeam = await Team.create(addTeam);
			if (addedTeam === null) {
				checkAddSuccess = false;
			}
			const result = await User.findByIdAndUpdate(newTeam.ownerId, {
				$push: { teams: addedTeam.id },
			});
			// .then((result) => {
			// 	result.teams.push(addedTeam.id);
			// });
			if (result === null) {
				checkAddSuccess = false;
			}
			if (checkAddSuccess) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log("create team error: " + error);
			throw new Error(error);
		}
	}

	static async getAllTeamOfOwnerByOwnerId(ownerId) {
		try {
			const teams = await User.findById(ownerId)
				.populate({
					path: "teams",
					populate: {
						path: "members",
					},
				})
				.then((user) => {
					if (user !== null) {
						return user.teams;
					} else {
						throw new Error("user not found");
					}
				});

			if (teams !== null) {
				return teams;
			}
		} catch (error) {
			console.log("get all teams of owner error: " + error);
			throw new Error(error);
		}
	}

	static async getAllJoinedTeamsByOwnerId(ownerId) {
		try {
			const teams = await Team.find({
				members: ownerId,
			});

			if (teams !== null) {
				return teams;
			}
		} catch (error) {
			console.log("get all joined teams of owner error: " + error);
			throw new Error(error);
		}
	}

	static async getTeamById(teamId) {
		try {
			const team = await Team.findById(teamId)
				.populate({
					path: "members",
				})
				.then((user) => {
						if (user !== null) {
							return user;
						} else {
							throw new Error("team not found");
						}
				});
			if (team !== null) {
				console.log("--------------------------------");
				return team;
			} 
		} catch (error) {
			console.log("get team by id error : " + error);
			throw new Error(error);
		}
	}
}

module.exports = TeamService;
