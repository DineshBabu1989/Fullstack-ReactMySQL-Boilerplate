const mysql = require("mysql");
const credentials = require("./config/keys");

//Connect to MySql db
const db = mysql.createConnection({
  host: "localhost",
  user: credentials.user,
  password: credentials.password,
  database: "testdb"
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("My Sql Connected");
});
module.exports = db;
