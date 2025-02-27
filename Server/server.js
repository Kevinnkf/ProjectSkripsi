const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 

let messages = ["Backend is running!"];

app.get("/", (req, res) => {
    res.json(messages);
});

app.post("/", (req, res) => {
    const { message } = req.body;
    messages.push(message);
    res.json({ status: "Message added", messages });
});

// 🔥 Tambahin route ini supaya Vue bisa ambil data admin
app.get("/api/admin", (req, res) => {
    const admins = [
        { id: 1, name: "Admin 1" },
        { id: 2, name: "Admin 2" }
    ];
    res.json(admins);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
