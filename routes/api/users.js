const express = require("express");
const router = express.Router();
const db = require("../../connection");

//GET: http://localhost:5000/user/user/test
//DESC:TESTING ROUTE
//PUBLIC
router.get("/test", function(req, res) {
  res.send({ msg: "User Registration page" });
});

//Create db
router.get("/createdb", (req, res) => {
  //Query to create db
  let sql = "CREATE DATABASE testdb";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created...");
  });
});

//GET ROUTE: http://localhost:5000/user/createtable
router.get("/createtable", (req, res) => {
  //Query to create table
  var sql =
    "CREATE TABLE users (id int AUTO_INCREMENT, name VARCHAR(255), age INT(11), job VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Table created...");
  });
});

//POST ROUTE: http://localhost:5000/user/postdetails
//Posting new student details
router.post("/postdetails", (req, res) => {
  console.log(req.body);
  let post = { name: req.body.name, age: req.body.age, job: req.body.job };
  let sql = "INSERT INTO users SET ?";
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(req.body);
  });
});

//GET ROUTE: http://localhost:5000/users/alldetails
//Getting all records
router.get("/alldetails", (req, res) => {
  let sql = "SELECT * FROM users ORDER BY id ASC";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//DELETE ROUTE: http://localhost:5000/user/detail/id
//Deleting a single student detail
router.delete("/detail/:id", (req, res) => {
  let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//UPDATE ROUTE: http://localhost:5000/user/update/id
//Updating a single student detail
router.put("/update/:id", (req, res) => {
  let sql = `UPDATE users SET ? WHERE id = ${req.params.id}`;
  let post = { name: req.body.name, age: req.body.age, job: req.body.job };
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

module.exports = router;
