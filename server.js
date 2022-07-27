require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
const PORT = 3000 || process.env.PORT;
const routes = require("./routes")
const registerWebsocket = require("./socket")
require("./db")();

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + "/public"))
app.use(routes)

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

registerWebsocket(server)



