const express = require("express");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

let app = express();

const DATABASE_URL = "mongodb://localhost/library";
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("MongoDB Database connection established");
});

app.use(express.json());

const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
const orderRouter = require("./routes/orderRoutes");

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/orders", orderRouter);

const swaggerDocument = YAML.load("swagger.yaml");
app.use("/api-docs".swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
