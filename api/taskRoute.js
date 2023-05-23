const express = require("express");
const Task = require("../models/taskModel");
const taskRoute = express.Router();

taskRoute.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

taskRoute.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);
    if (!task) {
      res
        .status(404)
        .json({ message: "Can not find any task with id : " + id });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

taskRoute.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

taskRoute.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndUpdate(id, req.body);
    if (!task) {
      res
        .status(404)
        .json({ message: "Can not find any task with id : " + id });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

taskRoute.put("/update-status/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(
      JSON.stringify({ _id: id }) +
        JSON.stringify({ status: req.body.newStatus })
    );
    const task = await Task.findOneAndUpdate(
      { _id: id },
      { status: req.body.newStatus }
    );
    if (!task) {
      res
        .status(404)
        .json({ message: "Can not find any task with id : " + id });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

taskRoute.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      res
        .status(404)
        .json({ message: "Can not find any task with id : " + id });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = taskRoute;
