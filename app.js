const express = require("express");
const socketio = require("socket.io");
const app = express();

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

io.on("connection", socket => {
  console.log("New user connected", socket.id);


  pool.query(`select * from socket order by socket_id desc limit 25`)
    .then(res => {
      io.sockets.emit("start_message", { data: res.rows })
    })
    .catch(err => console.error('Error executing query', err.stack))

    
  socket.username = "Anonymous"


  socket.on("change_username", data => {
    socket.username = data.username
    console.log("change username", socket.username);
  })
  

  // handle the new message eventf
  socket.on("new_message", data => {
    console.log("new messsage", data.message);
    pool.query(`INSERT INTO socket (username,message_p) VALUES ('${socket.username}', '${data.message}')`)
      .then(res => {
        // console.log(res)
        pool.query(`select * from socket order by socket_id desc limit 25`)
        .then(res => {
          io.sockets.emit("receive_message", { data: res.rows })
        })
        .catch(err => console.error('Error executing query', err.stack))
    
      })
      .catch(err => console.error('Error executing query', err.stack));
  })


  socket.on('typing', data => {
    socket.broadcast.emit('typing', { username: socket.username })
  })
});

