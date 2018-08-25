const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const db = require("./connection");
const users = require("./routes/api/users");

const app = express();

//Create body parser middleware to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Routes
app.use("/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
