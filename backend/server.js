//const express = require("express");
import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255)NOT NULL,
    title VARCHAR(255)NOT NUL,
    amount Decimal(10,2)NOT NUL,
    category VARCHAR(255)NOT NUL,
    created_at DATE NOT NULL DEFOULT CURRENT_DATE
    
    )`;
    console.log("Database initialized successfully");
  } catch (error) {
    console.log("ERROR initializing database:", error);
    process.exit(1); //status code 1 means faliure,0 success
  }
}

connectDB(process.env.DATABASE_URL);

app.get("/", (req, res) => {
  res.send("It's working 123 fine");
});

console.log("my port:", process.env.PORT);

app.listen(5001, () => {
  console.log("server is up and running on PORT:", PORT);
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is up and running on PORT:", PORT);
  });
});
