const express = require("express");
const authApi = express.Router();
const session = require("express-session");

authApi.use(
  session({
    secret: "32bJS7s5k5al",
    resave: false,
    saveUninitialized: false,
  })
);

const users = [
  {
    id: 1,
    firstName: "Per",
    lastName: "Borgli",
    email: "per@mail.com",
    password: "123",
  },
  {
    id: 2,
    firstName: "Sander",
    lastName: "Nilsen",
    email: "sander@mail.com",
    password: "123",
  },
];

authApi.get("/api/user", (req, res) => {
  console.log(users);
  res.json(users);
});

authApi.post("/api/user", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);
  users.push({ firstName, lastName, email, password, id: users.length + 1 });
  console.log(users);
  res.status(201).end();
});

authApi.get("/api/profile", (req, res) => {
  const { username } = req.session;
  if (!username) {
    return res.status(401).send();
  }
  res.json({ username });
});

authApi.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  let foundUser = false;
  let user;
  users.forEach((e) => {
    if (e.email == username && e.password == password) {
      foundUser = true;
      user = e;
    }
  });

  if (foundUser) {
    req.session.username = username;
    res.end();
  } else {
    res.sendStatus(401);
  }
});

module.exports = authApi;
