const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

// Serve static files 
app.use(express.static(__dirname));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true
}));

// Serve HTML
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

// Login logic
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@gmail.com" && password === "1234") {
        req.session.user = email;
        res.redirect("/dashboard");
    } else {
        res.send("Invalid login!");
    }
});

// Dashboard
app.get("/dashboard", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/");
    }
    res.send("<h2>Welcome to eHandicrafts 🎉</h2><a href='/logout'>Logout</a>");
});

// Logout
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.listen(3001, "0.0.0.0", () => {
    console.log("Server running on port 3001");
});