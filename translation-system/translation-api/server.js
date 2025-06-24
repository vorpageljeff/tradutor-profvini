const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectQueue } = require("./queue");

const translationsRoutes = require("./routes/translations");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/translations", translationsRoutes);

async function start() {
  try {
    await mongoose.connect("mongodb://localhost:27017/translation_db");
    console.log("MongoDB connected");

    await connectQueue();
    console.log("Connected to RabbitMQ");

    app.listen(3000, () => {
      console.log("API listening on http://localhost:3000");
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
