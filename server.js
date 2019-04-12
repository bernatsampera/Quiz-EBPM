const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const http = require("http");
const socketServer = require("socket.io");

const users = require("./routes/api/users");
const game = require("./routes/api/game");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Starts Sockets
var server = http.createServer(app);
const io = socketServer(server);

server.listen(3001, () => {
  console.log("Socket Server listening on 3001");
});

var room = [];
var socs = [];

io.on("connection", socket => {
  socs.push(socket);

  socket.on("user", async data => {
    if (room.filter(user => user.name == data.name).length == 0) {
      await room.push({
        name: data.name,
        score: 0
      });
      socs.forEach(socket => socket.emit("room", room));
    }
  }); // add user

  socket.on("removeuser", async data => {
    await room.forEach(user =>
      user.name == data.name ? room.pop(user) : null
    );
    socs.forEach(socket => socket.emit("room", room));
  }); // remove user

  socket.on("score", async data => {
    console.log(data.user);
    console.log(data.score);
  });

  socket.on("disconnect", function() {
    console.log("Desconnexió: " + socket.id);
  }); // disconnect
}); // end connection

//Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/game", game);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
