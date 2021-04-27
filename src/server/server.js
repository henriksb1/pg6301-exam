const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const messageApi = require("./messageApi");
const authApi = require("./authApi");

const app = express();

app.use(bodyParser.json());

app.use("/api/message", messageApi);
app.use("", authApi);

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
