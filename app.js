// load our app server using express

const express = require("express");
const app = express();
// logging in requests
const morgan = require("morgan");

// app.use(morgan("combined"));
// the amount of info is logged in based on combined/short
// everything is logged into the terminal, not into the "inspect element" in the browser console.
app.use(morgan("short"));

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
