require("dotenv").config();
const express = require("express")
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 8001
const {dbConnection} = require("./config/config")

// Linea de codigo para que postman pueda entender el formato de la peticion
app.use(express.json(), cors())

dbConnection()

// RUTAS ---------------------

app.use("/posts", require("./routes/posts"))
app.use("/users", require("./routes/users"))
app.use("/activities", require("./routes/activities"))

app.listen(PORT, ()=> console.log(`server stared on port ${PORT}`))
