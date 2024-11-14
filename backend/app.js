const express = require("express");
const app = express();
const empresaRoutes = require("./routes/empresaRoutes");

app.use(express.json());

app.use("/empresas", empresaRoutes);

module.exports = app;
