const express = require("express");
const socketio = require("socket.io");
const chatapp = require("./models/chatapp");
const Sequelize = require("sequelize");


const cors = require("cors")
const app = express();
app.use(cors())
const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "dbtestweb.cfmj5tyc25av.ap-southeast-1.rds.amazonaws.com",
  databasse: "postgres",
  password: "sshO1ZTb3Zg1v6LgjmQQ",
  port: "5432"
});


app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});



const server = app.listen(process.env.PORT || 3000, () => {
  console.log("server is running...");
});

// Initialize socket for the server
const io = socketio(server);

io.on("connection", async socket => {
  console.log("New user connected", socket.id);

  // setInterval(function() {
  //   var currentDate = new Date();
  //   io.sockets.emit('clock',{currentDate:currentDate});
  // },1000);
  const selectall = await chatapp.findAll({ order: Sequelize.literal("id DESC") });
  io.sockets.emit("start_messagetest", { test: selectall })


  socket.username = "Anonymous"


  socket.on("change_username", data => {
    socket.username = data.username
    console.log("change username", socket.username);
  })
  

  // handle the new message eventf
  socket.on("new_message", async data => {
     console.log("new messsage user :",socket.username, data.message);
    
     let data1 = {
      username:socket.username,
      msg:data.message,
     }
     let result = await chatapp.create(data1);
     //console.log(result)

     const selectall = await chatapp.findAll({ order: Sequelize.literal("id DESC") });
     io.sockets.emit("receive_message", { data: selectall });
  })


  socket.on('typing', data => {
    socket.broadcast.emit('typing', { username: socket.username })
  })
});

