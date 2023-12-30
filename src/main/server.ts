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
    })

    server.listen(env.port, () => { console.log(`Server is running at http://localhost:${env.port}`) })
  })
  .catch(console.error)
