const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bibhu@06",
    database: "todo_db"
});

db.connect(err => {
    if (err) console.log(err);
    else console.log("MySQL Connected");
});

app.get("/tasks", (req, res) => {
    db.query("SELECT * FROM tasks", (err, result) => {
        res.json(result);
    });
});

app.post("/tasks", (req, res) => {
    const { text } = req.body;
    db.query("INSERT INTO tasks (text) VALUES (?)", [text], () => {
        res.send("Added");
    });
});

app.delete("/tasks/:id", (req, res) => {
    db.query("DELETE FROM tasks WHERE id = ?", [req.params.id], () => {
        res.send("Deleted");
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});