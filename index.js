const express = require('express');
const http = require('http');
const socketIo = require('socket.io-client');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(cors);


io.on('connection', socket => {
  console.log('Client connected:', socket.id);

  socket.on('layoutChange', updatedLayout => {
    // Broadcast the updated layout to all clients except the sender
    socket.broadcast.emit('updateLayout', updatedLayout);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});