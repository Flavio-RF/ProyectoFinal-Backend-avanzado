require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
const routes = require("./routes")
require("./db")();

app.use(cors())
app.use(express.json())
routes(app)


module.exports = app




