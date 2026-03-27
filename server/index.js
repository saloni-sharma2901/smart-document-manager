const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/docs", require("./routes/documentRoutes"));

app.listen(5000, () => console.log("Server running on 5000 🚀"));