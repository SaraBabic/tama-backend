import express from "express";
import Income from "../models/income.js";

const router = express.Router();

// Get all incomes
router.get("/", async (req, res) => {
  try {
    const incomes = await Income.find().populate("customer_id currency_id");
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create an income
router.post("/", async (req, res) => {
  const income = new Income(req.body);
  try {
    const newIncome = await income.save();
    res.status(201).json(newIncome);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
