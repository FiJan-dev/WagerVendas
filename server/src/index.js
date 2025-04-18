require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const port = process.env.SERVER_PORT;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) return console.error("Erro ao conectar com MySQL:", err);
  console.log("Conectado ao MySQL!");
});

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});

