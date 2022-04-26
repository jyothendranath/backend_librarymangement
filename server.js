const cors = require("cors");
const YAML = require("yamljs");
const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");

require("dotenv").config();

let app = express();

const URL = process.env.DATABASE_URL;
mongoose.connect(URL);
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("MongoDB Database connection established");
});

app.use(express.json());
app.use(cors());

const logger = require("./middlewares/logs");

app.use(logger);

const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
const orderRouter = require("./routes/orderRoutes");

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/orders", orderRouter);

const swaggerDocument = YAML.load("swagger.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const search = require("./routes/searchRoutes");
app.use("/search", search);

const loginRouter = require("./routes/loginRoutes");
app.use("/login", loginRouter);

const port = 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
