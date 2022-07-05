const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const JokeApi = require('sv443-joke-api');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.emit('some event', {
    someProperty: 'some value', otherProperty: 'other value'
}); // This will emit the event to all connected sockets

io.on('connectinon', (socket) => {
    socket.broadcast.emit('hi');
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

JokeApi.getJokes().then((res) => res.json()).then((data) => {
    console.log(data);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});