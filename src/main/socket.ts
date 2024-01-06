const io = require('socket.io')(3000, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket: any) => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
