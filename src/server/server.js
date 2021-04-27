const express = require("express");
const path = require("path");
const https = require("https");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "32bJS7s5k5al",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

const users = [
    {
        id: 1,
        firstName: "Per",
        lastName: "Borgli",
        email: "per@borgli",
        password: "123"
    },
    {
        id: 2,
        firstName: "Sander",
        lastName: "Nilsen",
        email: "sander@nilsen",
        password: "123"
    },
];

const messages = [
    {
        id: 1,
        username: "user1@user1",
        receiver: "user2@user2",
        message: "Hello from the other side."
    }
]

app.get("/api/message", (req, res) => {
    res.json(messages);
});

app.post("/api/message", (req, res) => {
    const { username, message } = req.body;
    console.log(req.body);
    messages.push({ username, message, id: messages.length + 1 });
    console.log(messages)
    res.status(201).end();
});

app.get("/api/user", (req, res) => {
    console.log(users)
    res.json(users);
});

app.post("/api/user", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);
    users.push({ firstName, lastName, email, password, id: users.length + 1 });
    console.log(users)
    res.status(201).end();
});

app.get("/api/profile", (req, res) => {
  const { username } = req.session;
  if (!username) {
    return res.status(401).send();
  }
  res.json({ username });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  let foundUser = false;
  let user;
  users.forEach((e) => {
      if (e.email == username && e.password == password) {
          foundUser = true
          user = e
      }
  })

  if (foundUser) {
    req.session.username = username;
    res.end();
  } else {
    res.sendStatus(401);
  }
});

app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
  } else {
    next();
  }
});

    app.listen(3000, () => {
    console.log(`server started on http://localhost:3000`);
  });
