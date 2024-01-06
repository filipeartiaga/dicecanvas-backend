const io = require('socket.io')(3000, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket: any) => {
  console.log('connected')
  socket.on('message', (msg: any) => {
    console.log(msg)
    io.emit('message', msg)
  })
})
