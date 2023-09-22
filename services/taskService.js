const Task = require("../models/taskModel");
const User = require("../models/userModel");

class TaskService {
	static async getTasksByOwnerIdOnMonth(ownerId, month) {
		try {
			const tasks = await Task.find({
				"owner": ownerId,
				"$expr": { "$eq": [{ "$month": "$timeEnd" }, month] },
			});
			return tasks;
		} catch (error) {
			console.log("get tasks on current month error : " + error);
		}
	}

	static async getTasksByOwnerIdOnWeek(ownerId, week) {
		try {
			const tasks = await Task.find({
				"owner": ownerId,
				"$expr": { "$eq": [{ "$week": "$timeEnd" }, week] },
			});
			return tasks;
		} catch (error) {
			console.log("get tasks on current week error : " + error);
		}
	}

	static async getTasksByOwnerIdOnDate(ownerId, currentDate) {
		try {
			const tasks = await Task.find({
				"owner": ownerId,
				"$expr": {
					"$eq": [
						currentDate,
						{ "$dateToString": { date: "$timeEnd", format: "%Y-%m-%d" } },
					],
				},
			});
			return tasks;
		} catch (error) {
			console.log("get tasks on current date error : " + error);
			throw new Error(error);
		}
	}

	static async getTaskById(taskId) {
		try {
			const task = await Task.findById(taskId);
			if (task !== null) {
				return task;
			}
		} catch (error) {
			console.log("get task by id error : " + error);
			throw new Error(error);
		}
	}

	static async getAllTasksOfOwnerByOwnerId(ownerId) {
		try {
			const tasks = await User.findById(ownerId)
				.populate("tasks")
				.then((user) => {
					if (user !== null) {
						return user.tasks;
					} else {
						throw new Error("user not found");
					}
				});

			if (tasks !== null) {
				return tasks;
			}
		} catch (error) {
			console.log("get all tasks of owner error: " + error);
			throw new Error(error);
		}
	}

	static async getTaskById(id) {
		try {
			const task = await Task.findById(id).populate({
				path : "members",
			}).then((user)=> {
				if (user !== null) {
					return user;
				} else {
					throw new Error("task not found");
				}
			})
			if (task !== null) {
				return task;
			} 
		} catch (error) {
			console.log("get task by if error : " + error);
			throw new Error(error);
		}
	}

	static async createTask(newTask) {
		try {
			const addTask = {
				title: newTask.title,
				imgUrl: newTask.imgUrl,
				description: newTask.description,
				timeStart: newTask.timeStart,
				timeEnd: newTask.timeEnd,
				categories: newTask.categories,
				members: newTask.members,
				status: newTask.status,
				owner: newTask.ownerId,
			};
			let checkAddSuccess = true;
			const addedTask = await Task.create(addTask);
			if (addedTask === null) {
				checkAddSuccess = false;
			}
			const result = await User.findByIdAndUpdate(newTask.ownerId, {
				$push: { tasks: addedTask.id },
			}).then((result) => {
				result.tasks.push(addedTask.id);
			});
			if (result === null) {
				checkAddSuccess = false;
			}
			if (checkAddSuccess) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log("create task error: " + error);
			throw new Error(error);
		}
	}

	static async updateTask(id, updateTask) {
		try {
			const result = await Task.findByIdAndUpdate(id, updateTask);
			if (result !== null) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log("update task error:" + error);
			throw new Error(error);
		}
	}

	static async updateStatusTask(id, newStatus) {
		try {
			const result = await Task.findOneAndUpdate(
				{ _id: id },
				{ status: newStatus }
			);
			if (result !== null) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log("update status task error:" + error);
			throw new Error(error);
		}
	}

	static async deleteTask(id) {
		try {
			const result = await Task.findByIdAndDelete(id);
			if (result !== null) {
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log("delete task error:" + error);
			throw new Error(error);
		}
	}
}

module.exports = TaskService;
