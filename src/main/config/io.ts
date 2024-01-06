import { Server } from 'http'
import { Server as SocketIOServer } from 'socket.io'

const makeIo = (server: Server): SocketIOServer => {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*'
    }
  })

  return io
}

export default makeIo
