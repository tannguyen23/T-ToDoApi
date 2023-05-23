const express = require("express");
const Category = require("../models/categoryModel");
const categoryRoute = express.Router();

categoryRoute.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

categoryRoute.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) {
      res
        .status(404)
        .json({ message: "Can not find any category with id : " + id });
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

categoryRoute.post("/", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

categoryRoute.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body);
    if (!category) {
      res
        .status(404)
        .json({ message: "Can not find any category with id : " + id });
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

categoryRoute.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id, req.body);
    if (!category) {
      res
        .status(404)
        .json({ message: "Can not find any category with id : " + id });
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = categoryRoute;
