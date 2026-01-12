//const express = require("express");
import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();

//our custum simple middleware
app.use(express.json());
// app.use((req, res, next) => {
//   console.log("Hey we hit a req,the method is", req.method);
//   next();
// });

const PORT = process.env.PORT || 5001;

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title  VARCHAR(255) NOT NULL,
      amount  DECIMAL(10,2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
    )`;

    // DECIMAL (10,2)
    // means: a fixed-point number with:
    // 10 digits total
    // 2 digits after the decimal point
    // so: the max value it can store is 99999999.99 (8 digits before the decimal, 2 after)

    console.log("Database initialized successfully");
  } catch (error) {
    console.log("ERROR initializing database:", error);
    process.exit(1); //status code 1 means faliure,0 success
  }
}

app.post("api/transactions", (req, res) => {
  //title,amount,category,user_id
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || !amount || !category || !user_id === undefined) {
      return res.status(400).json({ message: "All fieled are required" });
    }
  } catch (error) {
    console.log("Error create in the transaction", error);
    res.status(500).json({ message: "internal server error" });
  }
});
app.get("/", (req, res) => {
  res.send("it's working");
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is up and running on PORT:", PORT);
  });
});
