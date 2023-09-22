const TaskService = require("../services/taskService");

class TaskController {
	// TODO : API FOR GET TASKS OF OWNERID ON CURRENT MONTH
	static async apiGetTasksOnMonthByOwnerId(req, res) {
		try {
			const ownerId = req.params.id;
			const currentDate = new Date();
			const currentMonth = currentDate.getMonth() + 1;
			const tasks = await TaskService.getTasksByOwnerIdOnMonth(ownerId,currentMonth);
			if (tasks) {
				res.status(200).json(tasks);
			}
		} catch (error) {
			res.status(500).json({message : error.message});
		}
	}

	// TODO : API FOR GET TASKS OF OWNERID ON CURRENT WEEK
	static async apiGetTasksOnWeakByOwnerId(req, res) {
		try {
			const ownerId  = req.params.id;
			const currentDate = new Date();
			const year = new Date(currentDate.getFullYear(), 0, 1);
			const days = Math.floor((currentDate - year) / (24 * 60 * 60 * 1000));
			const currentWeek = Math.ceil(( currentDate.getDay() + 1 + days) / 7) - 1;
			const tasks = await TaskService.getTasksByOwnerIdOnWeek(ownerId, currentWeek);
			if (tasks) {
				res.status(200).json(tasks);
			}
		} catch(error) {
			res.status(500).json({message: error.message});
		}
	}

	// TODO : API FOR GET TASKS OF OWNERID ON CURRENT DAY
	static async apiGetTasksOnDayByOwnerId(req, res) {
		try {
			const ownerId = req.params.id;
			const currentDate = new Date().toISOString().split('T')[0];
			const tasks = await TaskService.getTasksByOwnerIdOnDate(ownerId, currentDate)
			if (tasks) {
				res.status(200).json(tasks);
			}
		} catch (error) {
			res.status(500).json({message: error.message});
		}
	}

	// TODO: API FOR GET ALL TASKS OF OWNER BY OWNERID
	static async apiGetTasksByOwnerId(req, res) {
		try {
			const ownerId = req.params.id;

			const tasks = await TaskService.getAllTasksOfOwnerByOwnerId(ownerId);
			if (tasks) {
				res.status(200).json(tasks);
			}
		} catch (error) {
			console.log("Error : ", error);
			if (error.message = "user not found") {
				res
					.status(404)
					.json({ message: "Can not find  ownerId : " + req.params.id });
			} else {
				res.status(500).json({ message: error.message });
			}
		}
	}
	//TODO : API FOR GET TASK BY ID
	static async apiGetTaskById(req,res) {
		try {
			const id = req.params.id;
			const task = await TaskService.getTaskById(id);
			if (task) {
				res.status(200).json(task);
			}
		} catch (error) {
			console.log("Error : ", error);
			if(error.message = "task not found") {
				res.status(404).json({ message: "Can not find task : " + req.params.id });
			} else {
				res.status(500).json({message : error.message})
			}
		}
	}

	// TODO : API FOR CREATE NEW TASK
	static async apiCreateTask(req, res) {
		try {
			const addTask = {
				title: req.body.title,
				imgUrl: req.body.imgUrl,
				description: req.body.description,
				timeStart: req.body.timeStart,
				timeEnd: req.body.timeEnd,
				categories: req.body.categories,
				members: req.body.members,
				status: req.body.status,
				owner: req.body.ownerId,
				ownerId: req.body.ownerId,
			};
			const result = await TaskService.createTask(addTask);
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(400).json({ message: "Task creation failed" });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: error.message });
		}
	}
	// TODO : API FOR UPDATE TASK
	static async apiUpdateTask(req, res) {
		try {
			const id = req.params.id;
			const task = req.body;
			const result = await TaskService.updateTask(id, task);
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(400).json({ message: "Task update failed : " });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: error.message });
		}
	}
	// TODO : API FOR UPDATE STATUS TASK
	static async apiUpdateStatusTask(req, res) {
		try {
			const id = req.params.id;
			const newStatus = req.body.newStatus;
			const result = await TaskService.updateStatusTask(id, newStatus);
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(400).json({ message: "Update Status Task failed" });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: error.message });
		}
	}
	// TODO : API FOR DELETE TASK
	static async apiDeleteTask(req, res) {
		try {
			const id = req.params.id;
			const task = await TaskService.deleteTask(id);
			if (!task) {
				res.status(200).json(task);
			} else {
				res.status(400).json({ message: "Delete task failed" });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: error.message });
		}
	}
}

module.exports = TaskController;
