const io = require('socket.io')(3000, {
  allowRequest: (req, callback) => {
    const noOriginHeader = req.headers.origin === undefined
    callback(null, noOriginHeader)
  }
})

io.on('connection', (socket: any) => {
  console.log('connected')
  socket.on('message', (msg: any) => {
    console.log(msg)
    io.emit('message', msg)
  })
})
