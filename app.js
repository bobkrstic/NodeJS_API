// load our app server using express
var express = require("express");
const app = express();
const morgan = require("morgan");
var mysql = require("mysql");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// our application server is now going to able to serve all of the files
// inside the "public"
app.use(express.static("./public"));

app.use(morgan("short"));

// refactoring our code
// with Router
const router = require("./routes/user.js");
app.use(router);

// main route landing page
app.get("/", (req, res) => {
  console.log("Responding to root route");
  res.send("Hello from Root");
});

const PORT = process.env.PORT || 3003;
// localhost:PORT
app.listen(PORT, () => {
  console.log("Server is up and listening on: " + PORT);
});
