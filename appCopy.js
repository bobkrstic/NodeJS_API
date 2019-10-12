// SAVING THIS FILE TO USE IT AS A GUIDE WITH ALL THE HELPFUL COMMENTS

// load our app server using express
var express = require("express");
const app = express();
// logging in requests with morgan package
const morgan = require("morgan");
var mysql = require("mysql");

// app.use(morgan("combined"));
// the amount of info is logged in based on combined/short
// everything is logged into the terminal, not into the "inspect element" in the browser console.
app.use(morgan("short"));

// specifying route for fetching data based on the user id
app.get("/user/:id", (req, res) => {
  console.log("Fetching user with id: " + req.params.id);

  // the id is now stored in req.params.id
  // here we need to use that information to get the data from mysql base
  var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    socket: "	/Applications/MAMP/tmp/mysql/mysql.sock",
    database: "myDataBase"
  });

  // connection.connect(function(err) {
  //   if (err) throw err;
  //   console.log("Connected");
  // });

  const userId = req.params.id;
  const queryString = "SELECT * FROM users WHERE id = ?";
  // executing sequel query to pull down data from the database
  connection.query(queryString, [userId], (err, rows, fields) => {
    console.log("I think we fetched users successfully");
    if (err) {
      console.log("Failed to query for users: " + err);
      res.sendStatus(500);
      return;
    }
    console.log("Connected");
    res.json(rows);
  });
  // res.end();
});

// specify the root directory, root route
// the first landing page
// the first parametar is the request from the browser
// the second one is the response that we are sending to the browser
// the response that we are giving to the request
app.get("/", (req, res) => {
  console.log("Responding to root route");
  res.send("Hello from Root");
});

app.get("/users", (req, res) => {
  // we will now send data to the browser
  // the route is "/users"
  const user1 = { id: "1", firstName: "Bob", lastName: "Krstic" };
  const user2 = { id: "2", firstName: "Jack", lastName: "Sparrow" };
  res.json([user1, user2]);

  //   res.send("Nodemon auto updates when I save this file");
});

// localhost:3003
// server is listening on this address
app.listen(3003, () => {
  console.log("Server is up and listening on 3003");
});
