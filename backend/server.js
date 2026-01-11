//const express = require("express");
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("It's working 123 fine");
});

app.listen(5001, () => {
  console.log("server is up and running on PORT:5001");
});
