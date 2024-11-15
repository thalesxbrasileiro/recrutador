const express = require("express");
const app = express();
const empresaRoutes = require("./routes/empresaRoutes");

app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use("/empresas", empresaRoutes);

module.exports = app;
