// This file will contain all user related routes
// refactoring our code
// with Router
const express = require("express");
const mysql = require("mysql");

const router = express.Router();
router.get("/messages", (req, res) => {
  console.log("11111...");
  res.end();
});

// getting all the users (all rows from the database table)
router.get("/users", (req, res) => {
  const queryString = "SELECT * FROM users";
  getConnection().query(queryString, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users: " + err);
      res.sendStatus(500);
      return;
    }
    res.json(rows);
  });
});

router.get("/user/:id", (req, res) => {
  console.log("Fetching user with id: " + req.params.id);

  const userId = req.params.id;
  const queryString = "SELECT * FROM users WHERE id = ?";

  getConnection().query(queryString, [userId], (err, rows, fields) => {
    console.log("I think we fetched users successfully");
    if (err) {
      console.log("Failed to query for users: " + err);
      res.sendStatus(500);
      return;
    }
    console.log("Connected");
    res.json(rows);
  });
});

router.post("/user_create", (req, res) => {
  console.log("Trying to create a new user...");
  console.log("First name: " + req.body.create_first_name);
  // capturing input from a user
  const firstName = req.body.create_first_name;
  const lastName = req.body.create_last_name;

  const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)";

  getConnection().query(
    queryString,
    [firstName, lastName],
    (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new user: " + err);
        res.sendStatus(500);
        return;
      }
      console.log("Inserted a new user with id: ", results.insertedId);
      res.end();
    }
  );
});

// creating "pool" to avoid connection issues
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "us-cdbr-iron-east-05.cleardb.net",
  // port: 3306,
  user: "b6cd3301561a7d",
  password: "fb27a141",
  // socket: "	/Applications/MAMP/tmp/mysql/mysql.sock",
  database: "heroku_f21714883e8fb20"
});

function getConnection() {
  return pool;
}

module.exports = router;
