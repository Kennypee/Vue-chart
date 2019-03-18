/* eslint-disable no-console */
const express = require("express");
const app = express();
const port = 4000;

const server = app.listen(`${port}`, function() {
  console.log(`Server started on port ${port}`);
});
const io = require("socket.io")(server);

io.on("connection", socket => {
  socket.on("update", data => {
    socket.broadcast.emit("newdata", data);
    console.log(data);
  });
});

