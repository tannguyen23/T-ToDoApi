const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

require('dotenv').config()


//confifuration cors
const corsOptions = {
  origin: "http://localhost:3001",
  creadential: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const port = 3000;

//routes
const taskRoute = require("./api/taskRoute");
const memberRoute = require("./api/memberRoute");
const categoryRoute = require("./api/categoryRoute");

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/task", taskRoute);
app.use("/api/member", memberRoute);
app.use("/api/category", categoryRoute);

//connect mongoose

mongoose
  .connect(
    process.env.MONGODB_URL
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Node api is running on port : ${port}`);
    });
  })
  .catch((err) => console.log(err));
