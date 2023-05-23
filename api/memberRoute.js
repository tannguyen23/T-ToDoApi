const express = require("express");
const Member = require("../models/memberModel");
const memberRoute = express.Router();

memberRoute.get("/", async (req, res) => {
  try {
    const members = await Member.find({});
    res.status(200).json(members);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

memberRoute.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const member = await Member.findById(id);
    if (!member) {
      res
        .status(404)
        .json({ message: "Can not find any member with id : " + id });
    } else {
      res.status(200).json(member);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

memberRoute.post("/", async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(200).json(member);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

memberRoute.put("/:id", async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body);
    if (!member) {
      res
        .status(404)
        .json({ message: "Can not find any member with id : " + id });
    } else {
      res.status(200).json(member);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

memberRoute.delete("/:id", async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id, req.body);
    if (!member) {
      res
        .status(404)
        .json({ message: "Can not find any member with id : " + id });
    } else {
      res.status(200).json(member);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = memberRoute;
