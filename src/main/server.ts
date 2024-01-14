import { RollResult } from 'src/domain/models/log/roll-result'
import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    const server = (await import('./config/httpServer')).default(app)
    const io = (await import('./config/io')).default(server)

    io.on('connection', (socket) => {
      socket.on('message', (data) => {
        io.emit('message', data)
      })

      socket.on('send-log', (rollResult: RollResult, emitter: string) => {
        io.emit('new-log', rollResult, emitter)
      })
    })

    server.listen(env.port, () => { console.log(`Server is running at http://localhost:${env.port}`) })
  })
  .catch(console.error)
