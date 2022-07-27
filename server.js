require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
require("./db")();



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})