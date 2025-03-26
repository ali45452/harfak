
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let firstPlayer = null;

app.use(express.static(__dirname + '/public'));

io.on('connection', socket => {
  socket.on('buzz', name => {
    if (!firstPlayer) {
      firstPlayer = name;
      io.emit('winner', name);
    }
  });

  socket.on('reset', () => {
    firstPlayer = null;
    io.emit('reset');
  });
});

http.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
