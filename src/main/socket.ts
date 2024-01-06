const io = require('socket.io')(3000, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket: any) => {
  console.log('connected')
  socket.on('message', (msg: any) => {
    console.log(msg)
    io.emit('message', msg)
  })
})
