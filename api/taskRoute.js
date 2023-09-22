const express = require("express");
const taskRoute = express.Router();
const isAuth = require("../auth/auth.middleware");
const TaskController = require("../controllers/taskController");

// TODO : get tasks by ownerId on current month
taskRoute.get("/tasks-on-month/:id", TaskController.apiGetTasksOnMonthByOwnerId);

// TODO : get task by ownerId on current week
taskRoute.get("/tasks-on-week/:id", TaskController.apiGetTasksOnWeakByOwnerId);


// TODO: get tasks by ownerId on current date
taskRoute.get("/tasks-on-date/:id", TaskController.apiGetTasksOnDayByOwnerId);

// TODO : get all tasks by ownerId 
taskRoute.get(
	"/get-by-ownerid/:id",
	isAuth,
	TaskController.apiGetTasksByOwnerId
);

// TODO: get task by id of task
taskRoute.get("/:id", isAuth, TaskController.apiGetTaskById);

// TODO: create a task
taskRoute.post("/", isAuth, TaskController.apiCreateTask);

// TODO: Update a task
taskRoute.put("/:id", isAuth, TaskController.apiUpdateTask);

// TODO : Update status a task
taskRoute.put("/update-status/:id", isAuth, TaskController.apiUpdateStatusTask);

// TODO : Delete a task
taskRoute.delete("/:id", isAuth, TaskController.apiDeleteTask);

module.exports = taskRoute;
