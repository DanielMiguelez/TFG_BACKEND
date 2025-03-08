require("dotenv").config();

const express = require("express")
const app = express();
const PORT = process.env.PORT || 8001

const {dbConnection} = require("./config/config")

// Linea de codigo para que postman pueda entender el formato de la peticion
app.use(express.json())

dbConnection()

app.listen(PORT, ()=> console.log(`server stared on port ${PORT}`))
