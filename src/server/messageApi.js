const express = require("express");
const messageApi = express.Router();

const messages = [
  {
    id: 1,
    username: "per@borgli",
    receiver: "sander@nilsen",
    message: "Hello from the other side",
  },
];

messageApi.get("", (req, res) => {
  res.json(messages);
});

messageApi.post("", (req, res) => {
  const { username, receiver, message } = req.body;
  messages.push({ username, receiver, message, id: messages.length + 1 });
  res.status(201).end();
});

module.exports = messageApi;
