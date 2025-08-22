import foodModel from "../models/foodModel.js";
import fs from "fs";

// ✅ Add Food
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.status(201).json({ success: true, message: "Food item added successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding food item" });
  }
};

// ✅ List Foods
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json(foods);   // simpler for frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching food items" });
  }
};

// ✅ Remove Food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Delete image file if it exists
    if (food.image && fs.existsSync(`uploads/${food.image}`)) {
      fs.unlinkSync(`uploads/${food.image}`);
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Food removed successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing food item" });
  }
};

export { addFood, listFood, removeFood };
