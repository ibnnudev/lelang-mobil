const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");
const cors = require("cors");
const requestLogger = require("./middlewares/request-logger");

// Routes
const routes = require("./routes/index");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

const PORT = process.env.PORT || 3000;

connectDB();

app.use("/api/v1", routes);

app.listen(PORT, () => {
  console.log(`\n====================================`);
  console.log(`🚀 Server is running at:`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`====================================\n`);
});
